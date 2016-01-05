import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Staff} from "../models/staff";
import {Action} from "../models/action";
import {Headers} from "angular2/http";

@Injectable()
export default class StarsService {
    currentUser:Staff;
    students;
    actions;
    actionTypes;
    baseUrl:string;

    constructor(public http:Http) {
        this.baseUrl = 'http://localhost:9080/api/stars/';
    }

    getResource(url) {
        return this.http.get(url).map(response => response.json());
    }

    login(username:string, password:string) {
        return new Observable.create(observer => {
            let url = `${this.baseUrl}login/${username}/${password}`;
            this.getResource(url).subscribe((user) => {
                if (user) {
                    this.currentUser = new Staff(user);
                    observer.next(this.currentUser);
                } else {
                    observer.error("Invalid username and/or password");
                }
            },
            error => {
                observer.error(error._body);
            });
        });
    }

    getStudents() {
        let url;
        if (this.currentUser.Type === "Faculty") {
            let courseCRNs = this.currentUser.Courses.map(c => c.CRN);
            url = `${this.baseUrl}students?courses=${courseCRNs}`;
        } else {
            url = `${this.baseUrl}students?programs=${this.currentUser.Program}`;
        }
        this.getResource(url).subscribe(students => {
            console.log("getStudentsByProgram.students", students);
            this.students = students;
        });
    }

    getActionTypes() {
        this.getResource(`${this.baseUrl}actiontypes`).subscribe(
            actionTypes => this.actionTypes = actionTypes
        );
    }

    getActions(studentId, actionBy) {
        let url = `${this.baseUrl}actions/${studentId}/${actionBy}/${this.currentUser.Username}`;
        console.log(url);
        this.getResource(url).subscribe((actions) => {
            this.actions = actions
        });
    }

    findAction(actionId:string) {
        if (this.actions) {
            return this.actions.filter(a => a._id == actionId)[0];
        }
    }

    deleteAction(actionId:string) {
        let action = this.findAction(actionId);
        console.log("action to delete: ", action);
        let index = this.actions.indexOf(action);
        this.actions.splice(index, 1);

        this.http.delete(`${this.baseUrl}actions/${actionId}`)
            .subscribe(result=> console.log(result));
    }

    addAction(action) {
        if (typeof this.actions === 'undefined') {
            this.actions = [];
        }

        delete action._id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(`${this.baseUrl}actions`, JSON.stringify(action), {headers: headers})
            .map(response => response.json())
            .subscribe(
                (addedAction:Action) => {
                    console.log("Action Added", addedAction);
                    this.actions.push(addedAction);
                });
    }

    updateAction(action:Action) {
        console.log("Action to be updated", JSON.stringify(action));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.baseUrl}actions/${action._id}`;
        this.http.put(url, JSON.stringify(action), {headers: headers})
            .subscribe(result=> console.log(result));
    }
}
