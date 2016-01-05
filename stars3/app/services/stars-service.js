System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/add/operator/map', "../models/staff", "angular2/http"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, staff_1, http_2;
    var StarsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (staff_1_1) {
                staff_1 = staff_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            StarsService = (function () {
                function StarsService(http) {
                    this.http = http;
                    this.baseUrl = 'http://localhost:9080/api/stars/';
                }
                StarsService.prototype.getResource = function (url) {
                    return this.http.get(url).map(function (response) { return response.json(); });
                };
                StarsService.prototype.login = function (username, password) {
                    var _this = this;
                    return new Observable_1.Observable.create(function (observer) {
                        var url = _this.baseUrl + "login/" + username + "/" + password;
                        _this.getResource(url).subscribe(function (user) {
                            if (user) {
                                _this.currentUser = new staff_1.Staff(user);
                                observer.next(_this.currentUser);
                            }
                            else {
                                observer.error("Invalid username and/or password");
                            }
                        }, function (error) {
                            observer.error(error._body);
                        });
                    });
                };
                StarsService.prototype.getStudents = function () {
                    var _this = this;
                    var url;
                    if (this.currentUser.Type === "Faculty") {
                        var courseCRNs = this.currentUser.Courses.map(function (c) { return c.CRN; });
                        url = this.baseUrl + "students?courses=" + courseCRNs;
                    }
                    else {
                        url = this.baseUrl + "students?programs=" + this.currentUser.Program;
                    }
                    this.getResource(url).subscribe(function (students) {
                        console.log("getStudentsByProgram.students", students);
                        _this.students = students;
                    });
                };
                StarsService.prototype.getActionTypes = function () {
                    var _this = this;
                    this.getResource(this.baseUrl + "actiontypes").subscribe(function (actionTypes) { return _this.actionTypes = actionTypes; });
                };
                StarsService.prototype.getActions = function (studentId, actionBy) {
                    var _this = this;
                    var url = this.baseUrl + "actions/" + studentId + "/" + actionBy + "/" + this.currentUser.Username;
                    console.log(url);
                    this.getResource(url).subscribe(function (actions) {
                        _this.actions = actions;
                    });
                };
                StarsService.prototype.findAction = function (actionId) {
                    if (this.actions) {
                        return this.actions.filter(function (a) { return a._id == actionId; })[0];
                    }
                };
                StarsService.prototype.deleteAction = function (actionId) {
                    var action = this.findAction(actionId);
                    console.log("action to delete: ", action);
                    var index = this.actions.indexOf(action);
                    this.actions.splice(index, 1);
                    this.http.delete(this.baseUrl + "actions/" + actionId)
                        .subscribe(function (result) { return console.log(result); });
                };
                StarsService.prototype.addAction = function (action) {
                    var _this = this;
                    if (typeof this.actions === 'undefined') {
                        this.actions = [];
                    }
                    delete action._id;
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(this.baseUrl + "actions", JSON.stringify(action), { headers: headers })
                        .map(function (response) { return response.json(); })
                        .subscribe(function (addedAction) {
                        console.log("Action Added", addedAction);
                        _this.actions.push(addedAction);
                    });
                };
                StarsService.prototype.updateAction = function (action) {
                    console.log("Action to be updated", JSON.stringify(action));
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    var url = this.baseUrl + "actions/" + action._id;
                    this.http.put(url, JSON.stringify(action), { headers: headers })
                        .subscribe(function (result) { return console.log(result); });
                };
                StarsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], StarsService);
                return StarsService;
            })();
            exports_1("default", StarsService);
        }
    }
});
//# sourceMappingURL=stars-service.js.map