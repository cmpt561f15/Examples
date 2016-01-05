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
                    this.resourceUrls = new Map();
                    this.baseUrl = 'http://localhost:9080/api/stars/';
                    this.resourceUrls.set('students', this.baseUrl + "students");
                    this.resourceUrls.set('actionTypes', this.baseUrl + "actiontypes");
                    this.resourceUrls.set('adviserTypes', this.baseUrl + "advisertypes");
                }
                StarsService.prototype.getResource = function (resource) {
                    var url = this.resourceUrls.get(resource);
                    return this.http.get(url).map(function (response) { return response.json(); });
                };
                StarsService.prototype.login = function (username, password) {
                    var _this = this;
                    return new Observable_1.Observable.create(function (observer) {
                        _this.http.get(_this.baseUrl + "login/" + username + "/" + password)
                            .map(function (response) { return response.json(); }).subscribe(function (user) {
                            if (user) {
                                _this.currentUser = new staff_1.Staff(user);
                                observer.next(_this.currentUser);
                            }
                            else {
                                observer.error("Invalid username and/or password");
                            }
                        });
                    });
                };
                StarsService.prototype.getStudentsByProgram = function (program) {
                    var _this = this;
                    //Convert a string value to an array if needed
                    this.adviserPrograms = typeof program === "string" ? [program] : program;
                    return new Observable_1.Observable.create(function (observer) {
                        _this.http.get(_this.baseUrl + "students/" + _this.adviserPrograms)
                            .map(function (response) { return response.json(); }).subscribe(function (students) {
                            _this.students = students.filter(function (s) { return _this.adviserPrograms.indexOf(s.Program) >= 0; });
                            if (_this.students.length > 0) {
                                observer.next([_this.students, _this.adviserPrograms]);
                            }
                            else {
                                observer.error("No records found");
                            }
                        });
                    });
                };
                StarsService.prototype.getStudentsByCourse = function (instructorCourses) {
                    var _this = this;
                    return new Observable_1.Observable.create(function (observer) {
                        _this.instructorCourses = instructorCourses;
                        _this.getResource('students').subscribe(function (students) {
                            _this.students = students.filter(function (s) { return _this.containsAny(instructorCourses, s.Courses, 'CRN'); });
                            console.log("instructorCourses", _this.instructorCourses);
                            if (_this.students.length > 0) {
                                observer.next(_this.students, _this.instructorCourses);
                            }
                            else {
                                observer.error("No records found");
                            }
                        });
                    });
                };
                StarsService.prototype.getStudentsByInstructor = function (instructorId) {
                    var _this = this;
                    return new Observable_1.Observable.create(function (observer) {
                        _this.getCourses(instructorId).subscribe(function (courses) {
                            _this.instructorCourses = courses;
                            _this.getResource('students').subscribe(function (students) {
                                _this.students = students.filter(function (s) { return _this.containsAny(_this.instructorCourses, s.Courses, 'CRN'); });
                                if (_this.students.length > 0) {
                                    observer.next([_this.students, _this.instructorCourses]);
                                }
                                else {
                                    observer.error("No records found");
                                }
                            });
                        });
                    });
                };
                StarsService.prototype.getCourses = function (instructorId) {
                    var _this = this;
                    return new Observable_1.Observable.create(function (observer) {
                        _this.http.get(_this.baseUrl + "courses/" + instructorId)
                            .map(function (response) { return response.json(); }).subscribe(function (courses) {
                            if (courses.length > 0) {
                                observer.next(courses);
                            }
                            else {
                                observer.error("No records found");
                            }
                        });
                    });
                };
                StarsService.prototype.getActions = function (studentId, actionBy) {
                    var _this = this;
                    console.log(this.baseUrl + "actions/" + studentId + "/" + actionBy + "/" + this.currentUser.Username);
                    this.http.get(this.baseUrl + "actions/" + studentId + "/" + actionBy + "/" + this.currentUser.Username)
                        .map(function (response) { return response.json(); }).subscribe(function (actions) {
                        _this.actions = actions;
                    });
                };
                StarsService.prototype.getActionTypes = function () {
                    return this.getResource('actionTypes');
                };
                StarsService.prototype.getStaff = function (type) {
                    return this.http.get(this.baseUrl + "staff/" + type)
                        .map(function (response) { return response.json(); });
                };
                StarsService.prototype.getPrograms = function () {
                    return this.http.get(this.baseUrl + "programs/" + this.adviserPrograms)
                        .map(function (response) { return response.json(); });
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
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.delete(this.baseUrl + "actions/" + actionId)
                        .subscribe(function (response) {
                        console.log('Delete done sucessfully');
                    });
                };
                StarsService.prototype.addAction = function (action) {
                    var _this = this;
                    if (typeof this.actions === 'undefined') {
                        this.actions = [];
                    }
                    delete action._id;
                    console.log("Action to be added", JSON.stringify(action));
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(this.baseUrl + "actions", JSON.stringify(action), { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (addedAction) {
                        console.log("Action Added", addedAction);
                        _this.actions.push(addedAction);
                    });
                };
                StarsService.prototype.updateAction = function (action) {
                    console.log("Action to be updated", JSON.stringify(action));
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.put(this.baseUrl + "actions/" + action._id, JSON.stringify(action), { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (updatedAction) {
                        console.log("Action Updated", updatedAction);
                    });
                };
                /*
                 Check if an array contains any elements in another array
                 e.g. check if student.Courses contain any of the instructorCourses
                 Further details @ http://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-elements-in-another-array-in-javascript
                */
                StarsService.prototype.containsAny = function (objectsArray, valuesArray, objectProperty) {
                    var result = objectsArray.filter(function (o) { return valuesArray.indexOf(o[objectProperty]) >= 0; });
                    return (result.length > 0);
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