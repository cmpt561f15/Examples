System.register([], function(exports_1) {
    var Action;
    return {
        setters:[],
        execute: function() {
            Action = (function () {
                function Action(_id, Date, ActionType, Title, Description, ByWhom, CourseCRN, Students) {
                    this._id = _id;
                    this.Date = Date;
                    this.ActionType = ActionType;
                    this.Title = Title;
                    this.Description = Description;
                    this.ByWhom = ByWhom;
                    this.CourseCRN = CourseCRN;
                    this.Students = Students;
                }
                return Action;
            })();
            exports_1("Action", Action);
        }
    }
});
//# sourceMappingURL=action.js.map