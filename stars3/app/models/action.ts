export class Action {
    constructor(
            public _id: string,
            public Date: string,
            public ActionType: string,
            public Title: string,
            public Description: string,
            public ByWhom:string,
            public CourseCRN: number,
            public Students: number[]) {
    }
}