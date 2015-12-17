System.register(['angular2/core', 'angular2/common', 'angular2/router', '../services/stars-service', "./ActionEditor"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, stars_service_1, ActionEditor_1;
    var StudentsList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (stars_service_1_1) {
                stars_service_1 = stars_service_1_1;
            },
            function (ActionEditor_1_1) {
                ActionEditor_1 = ActionEditor_1_1;
            }],
        execute: function() {
            StudentsList = (function () {
                function StudentsList(starsService, router) {
                    this.starsService = starsService;
                    this.router = router;
                    this.selectedProgram = 'All';
                    this.selectedCourse = 'All';
                    this.selectedStudents = [];
                    this.openForm = false;
                    if (typeof starsService.currentUser === 'undefined') {
                        router.navigate(['/Login']);
                    }
                    this.filteredStudents = starsService.students;
                }
                StudentsList.prototype.onParamChanged = function (selectedProgram, selectedCourse) {
                    if (selectedProgram == 'All' && selectedCourse === 'All') {
                        this.filteredStudents = this.starsService.students;
                        //console.log("this.filteredStudents - All", this.filteredStudents);
                        return false;
                    }
                    if (selectedProgram != 'All') {
                        this.filteredStudents = this.starsService.students.filter(function (s) { return s.Program == selectedProgram; });
                        //console.log("this.filteredStudents - " + selectedProgram, this.filteredStudents);
                        return false;
                    }
                    if (selectedCourse != 'All') {
                        this.filteredStudents = this.starsService.students.filter(function (s) { return s.Courses.indexOf(parseInt(selectedCourse)) > -1; });
                        //console.log("this.filteredStudents - " + selectedCourse, this.filteredStudents);
                        return false;
                    }
                };
                StudentsList.prototype.selectCheckbox = function (event) {
                    if (event.target.checked) {
                        this.selectedStudents.push(parseInt(event.target.value));
                    }
                    else {
                        this.selectedStudents = this.selectedStudents.filter(function (s) { return s != parseInt(event.target.value); });
                    }
                    console.log(this.selectedStudents);
                };
                StudentsList = __decorate([
                    core_1.Component({
                        selector: 'Students',
                        templateUrl: './app/components/students.html',
                        directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, ActionEditor_1.ActionEditor]
                    }), 
                    __metadata('design:paramtypes', [stars_service_1.default, router_1.Router])
                ], StudentsList);
                return StudentsList;
            })();
            exports_1("StudentsList", StudentsList);
        }
    }
});
//# sourceMappingURL=students.js.map