import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy,Router} from 'angular2/router';
import StarsService from "../services/stars-service";
import Utils from "../services/Utils";

@Component({
    selector: 'login',
    templateUrl: './app/components/login.html',
    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES]
})


export class LoginComponent {
    authenticateFailed: boolean = false;

    constructor (public starsService: StarsService, public router:Router ){}

    onLogin (username: string, password: string){
        let currentUser;
        var adviserPrograms;
        this.starsService.login(username, password).subscribe(
            user => {

                console.log("starsService.currentUser", this.starsService.currentUser);

                let getStudentsObservable = (user.Type === "Faculty") ?
                    this.starsService.getStudentsByInstructor(user.StaffNo) :
                    this.starsService.getStudentsByProgram(user.Program);

                getStudentsObservable.subscribe(
                    results => {
                        //In case of faculty the method will return both students and courses
                        let students, instructorCourses;
                        if (user.Type === "Faculty") {
                            //[students, instructorCourses] = results;
                            console.log("this.starsService.instructorCourses", this.starsService.instructorCourses);
                        } else {
                            console.log("this.starsService.adviserPrograms", this.starsService.adviserPrograms);
                            //[students, adviserPrograms] = results;
                        }
                        console.log("Students", this.starsService.students);

                        this.starsService.getActions(this.starsService.students).subscribe(
                            actions => {
                                console.log("Actions", this.starsService.actions);
                                //let actionTypes, staff, programs;
                                this.starsService.getPrograms().subscribe(
                                    programs => {
                                        if (typeof this.starsService.adviserPrograms !== "undefined") {
                                            this.starsService.programs = programs.filter(p => this.starsService.adviserPrograms.indexOf(p.Code) >= 0);
                                        }
                                    }
                                );

                                this.starsService.getActionTypes().subscribe(
                                    actionTypes => {
                                        this.starsService.actionTypes = actionTypes;
                                    }
                                );

                                this.starsService.getStaff().subscribe(
                                    staff => {
                                        this.starsService.coordinators = staff.filter(s => s.Type === 'Coordinator').map(s => s.Username);
                                        this.starsService.advisors = staff.filter(s => s.Type === 'Adviser').map(s => s.Username);
                                    }
                                );
                                setTimeout(() => {
                                    this.router.navigate(['/Students']);
                                }, 500);

                            }
                        );
                    }
                );

            },
            error => {console.log(error); this.authenticateFailed = true},
            () => {
                console.log("Getting STARS data done!")
            }
        );
    }
}
