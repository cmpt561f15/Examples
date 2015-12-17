export class Action {
    constructor(public ActionId: number,
                public Date: Date,
                public ActionType: string,
                public Title: string,
                public Description: string,
                public ByWhom:string,
                public CourseCRN: number,
                public Students: number[]) {
    }
}