export class Student {
    constructor(public StudentId: number,
                public FirstName: string,
                public LastName: string,
                public Gender: string,
                public Program: string,
                public GPA: number,
                public AtRiskCategory:string,
                public Semester: string,
                public Courses: number[]) {
    }
}