export class Staff {
    StaffNo:number;
    Username:string;
    FirstName:string;
    LastName:string;
    Password:string;
    Type:string;
    Program:(string[] | string);
    Courses;
    Programs;
    
/*    constructor( StaffNo:number,
                 Username:string,
                 FirstName:string,
                 LastName:string,
                 Password:string,
                 Type:string,
                 Program:string[]) {
            this.StaffNo = StaffNo;
            this.Username = Username;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Password = Password;
            this.Type = Type;
            this.Program = Program;
    }*/

    constructor(obj) {
        // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (obj[prop] instanceof Array) {
                    this[prop] = obj[prop].concat();
                } else {
                    this[prop] = obj[prop];
                }
            }
        }
    }
}