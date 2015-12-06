import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
//First we import all router-related directives and classes from ‘angular2/router’.
import {
        RouteConfig,  ROUTER_DIRECTIVES,
        LocationStrategy, HashLocationStrategy
    } from 'angular2/router';
import {Hero} from './../models/hero';
import {HeroEditor} from './hero-editor';
import {HeroList} from './hero-list';

/*
Root Component that defines the routes and loads the App main menu.
1) In the template:
 The first anchor tag has the property router-link bound to the route named Home.
 The square brackets on the left are for property binding.
 The square brackets on the right represent an array with one element (e.g. ‘Home’).
 The second anchor tag has the property router-link bound to the route named Hero.
 These routes’ names are specified in the @RouteConfig annotation.

2) The pair of tags <router-outlet></router-outlet> specifies the area in the page
where the router will render one of our components. The value in the router-link
will be matched with the route name from @RouteConfig.
In our case <router-outlet></router-outlet> represents the area below the anchors.
*/

/*
 The routes are configured in the @RouteConfig annotation.
 This is where we map the URL fragments (path) to application components.
 We also give each route a name, which is used with router-link.
 */
@RouteConfig([
    {path: '/', component: HeroList, as: 'Home'},
    {path: '/edit/:id', component: HeroEditor, as: 'Edit'  }
])
@Component({
    selector: 'heros-app',
    template: `
        <h1>{{title}}</h1>
<!--    <a [router-link]="['Home']">Home</a>
        <a [router-link]="['/Edit']">Edit</a>-->
        <router-outlet></router-outlet>`,
    directives: [ ROUTER_DIRECTIVES]
})

export class HeroApp {
    title = 'Beloved Heroes';
}