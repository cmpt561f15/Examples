import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy,Router} from 'angular2/router';
import StarsService from "../services/stars-service";

@Component({
    selector: 'login',
    templateUrl: './app/components/login.html',
    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES]
})

export class LoginComponent {
    authenticateFailed: boolean = false;
    message : string;

    constructor (public starsService: StarsService, public router:Router ){}

    onLogin (username: string, password: string){
        let currentUser;
        var adviserPrograms;
        this.starsService.login(username, password).subscribe(
            user => {
                console.log("starsService.currentUser", this.starsService.currentUser);
                this.starsService.getStudents();

                this.starsService.getActionTypes();

                this.router.navigate(['/Students']);
            },
            error => {
                console.log(error);
                this.message = error;
                this.authenticateFailed = true
            },
            () => {
                console.log("Getting STARS data done!")
            }
        );
    }
}
