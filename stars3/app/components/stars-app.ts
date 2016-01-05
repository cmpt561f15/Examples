import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {LoginComponent} from "./login";
import {StudentsList} from "./students";
import {ActionsList} from "./actions";
import StarsService from "../services/stars-service";

@RouteConfig([
    {path: '/',  component: LoginComponent, as: 'Login'},
    {path: '/students', component: StudentsList, as: 'Students'},
    {path: '/actions/:id', component: ActionsList, as: 'Actions'}
])

@Component({
    selector: 'stars-app',
    template: `
                <p *ngIf="starsService.currentUser" class="text-right"><i class="fa fa-user">&nbsp;&nbsp;</i>Welcome {{ starsService.currentUser.Firstname  }}
                {{ starsService.currentUser.Lastname }}
                (<a     [routerLink]="['/Login']"
                        (click)="onLogout()">Logout</a>)
                </p>

               <router-outlet></router-outlet>
               <router-outlet name="action"></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})

export class StarsApp {
    constructor(public starsService: StarsService, public router : Router) {
    }

    onLogout() {
        this.starsService.currentUser = undefined;
        this.router.navigate(['/Login']);
    }
}

