export class Course {
    constructor(public CRN: number,
                public CourseCode: string,
                public CourseName: string,
                public Semester: string,
                public InstructorId: number) {
    }
}