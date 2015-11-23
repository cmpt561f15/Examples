import DataService from './DataService'

export default class StarsService {
    dataService;
    constructor() {
        this.dataService = new DataService();
    }
    
    getStudentsByProgram(program:string | string[]) {
        //Convert a string value to an array if needed
        let programs = typeof program === "string" ? [program] : program;
        return new Promise((resolve, reject) => {
            this.dataService.getResource('students').then(students => {
                students = students.filter(s => programs.indexOf(s.Program) >= 0);
                if (students.length > 0) {
                    resolve([students, programs]);
                }
                else {
                    reject("No records found");
                }
            });
        });
    }

    getStudentsByCourse(instructorCourses) {
        return new Promise((resolve, reject) => {
            this.dataService.getResource('students').then(students => {
                students = students.filter(s => this.containsAny(instructorCourses, s.Courses, 'CRN'));
                console.log("instructorCourses", instructorCourses);
                if (students.length > 0) {
                    resolve(students, instructorCourses);
                }
                else {
                    reject("No records found");
                }
            });
        });
    }

    getStudentsByInstructor(instructorId:number) {
        let instructorCourses;
        return new Promise((resolve, reject) => {
            this.getCourses(instructorId).then(courses => {
                instructorCourses = courses;
                return this.dataService.getResource('students');
            }).then(students => {
                students = students.filter(s => this.containsAny(instructorCourses, s.Courses, 'CRN'));
                if (students.length > 0) {
                    resolve([students, instructorCourses]);
                }
                else {
                    reject("No records found");
                }
            });
        });
    }

    getCourses(instructorId:number) {
        return new Promise((resolve, reject) => {
            this.dataService.getResource('courses').then(courses => {
                courses = courses.filter(c => c.InstructorId == instructorId);
                if (courses.length > 0) {
                    resolve(courses);
                }
                else {
                    reject("No records found");
                }
            });
        });
    }

    getActions(students:number[]) {
        return new Promise((resolve, reject) => {
            this.dataService.getResource('actions').then(actions => {
                actions = actions.filter(a => this.containsAny(students, a.Students, 'StudentId'));
                if (actions.length > 0) {
                    resolve(actions);
                }
                else {
                    reject("No records found");
                }
            });
        });
    }

    getActionTypes() {
        return this.dataService.getResource('actionTypes');
    }
    
    getAdviserTypes() {
        return this.dataService.getResource('adviserTypes');
    }

    getPrograms() {
        return this.dataService.getResource('programs');
    }

    //Get programs and convert them to maps
    toMap(programs) {
        let programsMap = new Map<string, string>();
        for (let program of programs) {
            programsMap.set(program.Code, program.Name)
        }
        return programsMap;
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
