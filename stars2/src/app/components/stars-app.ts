import {Component, provide} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { bootstrap } from 'angular2/platform/browser';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy, Router, AuxRoute} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {LoginComponent} from "./login";
import {StudentsComponent} from "./students";
import {ActionsComponent} from "./actions";
import {DeleteActionComponent} from "./deleteAction";

@RouteConfig([
    {path: '/',  component: LoginComponent, as: 'Login'},
    {path: '/students', component: StudentsComponent, as: 'Students'},
    {path: '/actions/:id', component: ActionsComponent, as: 'Actions'},
    new AuxRoute({path: '/deleteAction', component: DeleteActionComponent})
])

@Component({
    selector: 'stars-app',
    template: `<router-outlet></router-outlet>
               <router-outlet name="deleteAction"></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

export class StarsApp {
}

