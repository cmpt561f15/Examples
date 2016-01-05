import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Staff} from "../models/staff";
import {Action} from "../models/action";
import {Headers,Response} from "angular2/http";

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
    baseUrl : string;

    constructor(public http : Http) {
        this.baseUrl = 'http://localhost:9080/api/stars/';
        this.resourceUrls.set('students', `${this.baseUrl}students`);
        this.resourceUrls.set('actionTypes', `${this.baseUrl}actiontypes`);
        this.resourceUrls.set('adviserTypes', `${this.baseUrl}advisertypes`);
    }

    getResource(resource) {
        let url = this.resourceUrls.get(resource);
        return this.http.get(url).map(response => response.json() );
    }

    login (username: string, password: string) {
        return new Observable.create(observer => {
            this.http.get(`${this.baseUrl}login/${username}/${password}`)
                .map(response => response.json()).subscribe((user) => {
                if (user) {
                    this.currentUser = new Staff(user);
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
            this.http.get(`${this.baseUrl}students/${this.adviserPrograms}`)
                .map( response => response.json() ).subscribe((students) => {
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
            this.http.get(`${this.baseUrl}courses/${instructorId}`)
                .map(response => response.json() ).subscribe((courses) => {
                if (courses.length > 0) {
                    observer.next(courses);
                }else {
                    observer.error("No records found");
                }
            });
        });
    }

    getActions(studentId, actionBy) {
        console.log(`${this.baseUrl}actions/${studentId}/${actionBy}/${this.currentUser.Username}`);
        this.http.get(`${this.baseUrl}actions/${studentId}/${actionBy}/${this.currentUser.Username}`)
            .map(response => response.json() ).subscribe((actions) => {
                this.actions= actions
        });
    }

    getActionTypes() {
        return this.getResource('actionTypes');
    }
    
    getStaff(type) {
        return this.http.get(`${this.baseUrl}staff/${type}`)
            .map(response => response.json() )
    }

    getPrograms() {
        return this.http.get(`${this.baseUrl}programs/${this.adviserPrograms}`)
            .map(response => response.json() );
    }

    findAction(actionId : string) {
        if (this.actions) {
            return this.actions.filter(a => a._id == actionId)[0];
        }
    }

    deleteAction(actionId : string) {
        let action = this.findAction(actionId);
        console.log("action to delete: ", action);
        let index = this.actions.indexOf(action);
        this.actions.splice(index, 1);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.delete(`${this.baseUrl}actions/${actionId}`)
            .subscribe(
                (response: Response) => {
                    console.log('Delete done sucessfully');
                });
    }

    addAction(action) {
        if (typeof this.actions === 'undefined') {
            this.actions = [];
        }

        delete action._id;
        console.log("Action to be added", JSON.stringify(action));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(`${this.baseUrl}actions`, JSON.stringify(action), {headers: headers})
            .map((res:Response) => res.json())
            .subscribe(
                (addedAction:Action) => {
                    console.log("Action Added", addedAction);
                    this.actions.push(addedAction);
                });
    }

    updateAction(action: Action) {
        console.log("Action to be updated", JSON.stringify(action));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.put(`${this.baseUrl}actions/${action._id}`, JSON.stringify(action), {headers:headers})
            .map((res: Response) => res.json())
            .subscribe(
                (updatedAction:Action) => {
                    console.log("Action Updated", updatedAction);
                });
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
