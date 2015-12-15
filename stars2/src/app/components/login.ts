import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy,Router} from 'angular2/router';
import AuthenticationService from '../services/AuthenticationService';
import DataService from "../services/DataService";
import StarsService from '../services/StarsService';
import Utils from "../services/Utils";
@Component({
    selector: 'login',
    providers: [AuthenticationService, DataService,StarsService ],
    templateUrl: './app/components/login.html',

    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES]
})



export class LoginComponent {

    username;
    password;
    alert : boolean = true;
    isDeauthenticated: boolean = false;
    constructor ( public as : AuthenticationService, public ds: DataService,
                  public ss: StarsService, public router:Router  ){}
    onLogin (){
        let currentUser;
        var adviserPrograms;
        this.as.login(this.username,this.password).subscribe(
            user => {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                let getStudentsObservable = (user.Type === "Faculty") ?
                    this.ss.getStudentsByInstructor(user.StaffNo) :
                    this.ss.getStudentsByProgram(user.Program);

                getStudentsObservable.subscribe(
                    results => {
                        //In case of faculty the method will return both students and courses
                        let students, instructorCourses;
                        if (currentUser.Type === "Faculty") {
                            [students, instructorCourses] = results;
                            console.log("Instructor Courses", instructorCourses);
                            localStorage.setItem('courses', JSON.stringify(instructorCourses));
                        } else {
                            [students, adviserPrograms] = results;
                        }
                        console.log("Students", students);
                        localStorage.setItem('students', JSON.stringify(students));

                        this.ss.getActions(students).subscribe(
                            actions => {
                                console.log("Actions", actions);
                                localStorage.setItem('actions', JSON.stringify(actions));
                                //let actionTypes, staff, programs;
                                this.ss.getPrograms().subscribe(
                                    programs => {
                                        if (typeof adviserPrograms !== "undefined") {
                                            programs = programs.filter(p => adviserPrograms.indexOf(p.Code) >= 0);
                                            localStorage.setItem('programs', JSON.stringify(programs));
                                        }
                                    }
                                );

                                this.ss.getActionTypes().subscribe(
                                    actionTypes => {
                                        localStorage.setItem('actionTypes', JSON.stringify(actionTypes));
                                    }
                                );

                                this.ss.getStaff().subscribe(
                                    staff => {
                                        let coordinators : string[] = staff.filter(s => s.Type === 'Coordinator').map(s => s.Username);
                                        let advisors : string [] = staff.filter(s => s.Type === 'Adviser').map(s => s.Username);
                                        localStorage.setItem('coordinators', JSON.stringify(coordinators));
                                        localStorage.setItem('advisors', JSON.stringify(advisors));
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
            error => {console.log(error); this.isDeauthenticated = true},
            () => {

            }
        );


    }



}
