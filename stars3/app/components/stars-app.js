System.register(['angular2/core', 'angular2/common', 'angular2/router', "./login", "./students", "./actions", "../services/stars-service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, login_1, students_1, actions_1, stars_service_1;
    var StarsApp;
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
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (students_1_1) {
                students_1 = students_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (stars_service_1_1) {
                stars_service_1 = stars_service_1_1;
            }],
        execute: function() {
            StarsApp = (function () {
                function StarsApp(starsService, router) {
                    this.starsService = starsService;
                    this.router = router;
                }
                StarsApp.prototype.onLogout = function () {
                    this.starsService.currentUser = undefined;
                    this.router.navigate(['/Login']);
                };
                StarsApp = __decorate([
                    router_1.RouteConfig([
                        { path: '/', component: login_1.LoginComponent, as: 'Login' },
                        { path: '/students', component: students_1.StudentsList, as: 'Students' },
                        { path: '/actions/:id', component: actions_1.ActionsList, as: 'Actions' }
                    ]),
                    core_1.Component({
                        selector: 'stars-app',
                        template: "\n                <p *ngIf=\"starsService.currentUser\" class=\"text-right\"><i class=\"fa fa-user\">&nbsp;&nbsp;</i>Welcome {{ starsService.currentUser.Firstname  }}\n                {{ starsService.currentUser.Lastname }}\n                (<a     [routerLink]=\"['/Login']\"\n                        (click)=\"onLogout()\">Logout</a>)\n                </p>\n\n               <router-outlet></router-outlet>\n               <router-outlet name=\"action\"></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [stars_service_1.default, router_1.Router])
                ], StarsApp);
                return StarsApp;
            })();
            exports_1("StarsApp", StarsApp);
        }
    }
});
//# sourceMappingURL=stars-app.js.map