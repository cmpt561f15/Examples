import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Staff} from "../models/staff";

@Injectable()
export default class StarsService {
    resourceUrls = new Map<string, string>();
    currentUser : Staff;
    students;
    instructorCourses;
    adviserPrograms;
    actions;
    programs;
    actionTypes;
    coordinators : string[];
    advisors : string [];

    constructor(public http : Http) {
        this.resourceUrls.set('courses', './data/course.json');
        this.resourceUrls.set('programs', './data/program.json');
        this.resourceUrls.set('students', './data/student.json');
        this.resourceUrls.set('staff', './data/staff.json');
        this.resourceUrls.set('actions', './data/action.json');
        this.resourceUrls.set('actionTypes', './data/actionType.json');
        this.resourceUrls.set('adviserTypes', './data/advisertype.json');
    }

    getResource(resource) {
        let url = this.resourceUrls.get(resource);
        return this.http.get(url).map(response => response.json() );
    }

    login (username: string, password: string) {
        return new Observable.create(observer => {
            this.getResource('staff').subscribe((users) => {
                users = users.filter(s => s.Username == username && s.Password == password);
                if (users.length > 0) {
                    this.currentUser = new Staff(users[0]);
                    observer.next(this.currentUser);
                } else {
                    observer.error("Invalid username and/or password");
                }
            });
        });
    }
    
    getStudentsByProgram(program:string | string[]) {
        //Convert a string value to an array if needed
        this.adviserPrograms = typeof program === "string" ? [program] : program;
        return new Observable.create(observer => {
            this.getResource('students').subscribe((students) => {
                this.students = students.filter(s => this.adviserPrograms.indexOf(s.Program) >= 0);
                if (this.students.length > 0) {
                    observer.next([this.students, this.adviserPrograms]);
                } else {
                    observer.error("No records found");
                }
            });
        });
    }

    getStudentsByCourse(instructorCourses) {
        return new Observable.create(observer => {
            this.instructorCourses = instructorCourses;
            this.getResource('students').subscribe((students) => {
                this.students = students.filter(s => this.containsAny(instructorCourses, s.Courses, 'CRN'));
                console.log("instructorCourses", this.instructorCourses);
                if (this.students.length > 0) {
                    observer.next(this.students, this.instructorCourses);
                }else {
                    observer.error("No records found");
                }
            });
        });
    }

    getStudentsByInstructor(instructorId : number) {
        return new Observable.create(observer => {
            this.getCourses(instructorId).subscribe(
                courses => {
                    this.instructorCourses = courses;
                    this.getResource('students').subscribe((students) => {
                        this.students = students.filter(s => this.containsAny(this.instructorCourses, s.Courses, 'CRN'));
                            if (this.students.length > 0) {
                                observer.next([this.students, this.instructorCourses]);
                            }else {
                                observer.error("No records found");
                            }
                        }
                    );
                }
            );
        });
    }

    getCourses(instructorId:number) {
        return new Observable.create(observer => {
            this.getResource('courses').subscribe((courses) => {
                courses = courses.filter(c => c.InstructorId == instructorId);
                if (courses.length > 0) {
                    observer.next(courses);
                }else {
                    observer.error("No records found");

                }
            });
        });
    }

    getActions(studentId, actionBy) {
        //return new Observable.create(observer => {
        this.getResource('actions').subscribe(
            actions => {
                this.actions = actions;
                this.filterActionsBy(studentId, actionBy)
            });
    }

    filterActionsBy(studentId, actionBy){
        this.actions= this.actions.filter(a => a.Students.indexOf( studentId) >= 0);
        switch (actionBy) {
            case 'me':
                if (typeof this.currentUser !== 'undefined') {
                    this.actions = this.actions.filter(a => a.ByWhom === this.currentUser.Username);
                }
                break;
            case 'adviser':
                this.actions = this.actions.filter(a => this.advisors.indexOf(a.ByWhom) >= 0);
                break;
            case 'coordinator':
                this.actions = this.actions.filter(a => this.coordinators.indexOf(a.ByWhom) >= 0);
                break;
            case 'faculty':
                this.actions = this.actions.filter(a => this.coordinators.indexOf(a.ByWhom) < 0
                        && this.advisors.indexOf(a.ByWhom) < 0);
                break;
        }
    }

    getActionTypes() {
        return this.getResource('actionTypes');
    }
    
    getStaff() {
        return this.getResource('staff');
    }

    getPrograms() {
        return this.getResource('programs');
    }

    findAction(actionId : number) {
        if (this.actions) {
            return this.actions.filter(a => a.ActionId == actionId)[0];
        }
    }

    deleteAction(actionId : number) {
        let action = this.findAction(actionId);
        console.log("action to delete: ", action);
        let index = this.actions.indexOf(action);
        this.actions.splice(index, 1);
        localStorage.setItem('actions', JSON.stringify(this.actions));
    }

    addAction(action) {
        if (typeof this.actions === 'undefined') {
            this.actions = [];
            action.ActionId = 1;
        } else {
            action.ActionId = this.actions[this.actions.length - 1].ActionId + 1;
        }
        this.actions.push(action);
        localStorage.setItem('actions', JSON.stringify(this.actions));
    }

    /*
     Check if an array contains any elements in another array
     e.g. check if student.Courses contain any of the instructorCourses
     Further details @ http://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-elements-in-another-array-in-javascript
    */
    private containsAny(objectsArray, valuesArray, objectProperty):boolean {
        var result = objectsArray.filter(o => valuesArray.indexOf(o[objectProperty]) >= 0);
        return (result.length > 0);
    }
}
