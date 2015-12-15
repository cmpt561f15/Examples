import DataService from './DataService';
import Utils from  './Utils'
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export default class AuthenticationService {
    user;
    constructor(public ds:DataService){}
     login (username: string, password: string) {

             return new Observable.create(observer => {
                 this.ds.getResource('staff').subscribe((users) => {
                     users = users.filter(s => s.Username == username && s.Password == password);
                     if (users.length > 0) {
                        // alert(users[0].Username + " hello");
                         observer.next(users[0]);

                     }else {
                         observer.error("Invalid username and/or password");

                     }
                 });
             });
    }
}