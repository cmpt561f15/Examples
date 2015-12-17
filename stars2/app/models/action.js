System.register([], function(exports_1) {
    var Action;
    return {
        setters:[],
        execute: function() {
            Action = (function () {
                function Action(ActionId, Date, ActionType, Title, Description, ByWhom, CourseCRN, Students) {
                    this.ActionId = ActionId;
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