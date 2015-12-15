import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import DataService from "./DataService";
@Injectable()
export default class StarsService {

    constructor(public ds: DataService) {

    }
    
    getStudentsByProgram(program:string | string[]) {
        //Convert a string value to an array if needed
        let programs = typeof program === "string" ? [program] : program;
        return new Observable.create(observer => {
            this.ds.getResource('students').subscribe((students) => {
                students = students.filter(s => programs.indexOf(s.Program) >= 0);
                if (students.length > 0) {
                    // alert(users[0].Username + " hello");
                    observer.next([students, programs]);
                   // observer.complete();
                }else {
                    observer.error("No records found");

                }
            });
        });
    }

    getStudentsByCourse(instructorCourses) {
        return new Observable.create(observer => {
            this.ds.getResource('students').subscribe((students) => {
                students = students.filter(s => this.containsAny(instructorCourses, s.Courses, 'CRN'));
                console.log("instructorCourses", instructorCourses);
                if (students.length > 0) {
                    // alert(users[0].Username + " hello");
                    observer.next(students, instructorCourses);
                    //observer.complete();
                }else {
                    observer.error("No records found");

                }
            });
        });
    }

    getStudentsByInstructor(instructorId:number) {
        let instructorCourses;
        return new Observable.create(observer => {
            this.getCourses(instructorId).subscribe(
                courses => {
                    instructorCourses = courses;
                    this.ds.getResource('students').subscribe((students) => {
                        students = students.filter(s => this.containsAny(instructorCourses, s.Courses, 'CRN'));
                            if (students.length > 0) {
                                observer.next([students, instructorCourses]);
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
            this.ds.getResource('courses').subscribe((courses) => {
                courses = courses.filter(c => c.InstructorId == instructorId);
                if (courses.length > 0) {
                    observer.next(courses);
                }else {
                    observer.error("No records found");

                }
            });
        });
    }

    getActions(students:number[]) {
        return new Observable.create(observer => {
            this.ds.getResource('actions').subscribe((actions) => {
                actions = actions.filter(a => this.containsAny(students, a.Students, 'StudentId'));
                if (actions.length > 0) {
                    observer.next(actions);
                }else {
                    observer.error("No records found");

                }
            });
        });
    }

    getActionTypes() {
        return this.ds.getResource('actionTypes');
    }
    
    getStaff() {
        return this.ds.getResource('staff');
    }

    getPrograms() {
        return this.ds.getResource('programs');
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
