import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy,Router} from 'angular2/router';

@Component({
    selector: 'deleteAction',
    templateUrl: './app/components/deleteAction.html',

    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES]
})

export class DeleteActionComponent {
}