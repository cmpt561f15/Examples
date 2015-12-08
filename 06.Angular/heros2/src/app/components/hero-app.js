var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
//First we import all router-related directives and classes from ‘angular2/router’.
var router_1 = require('angular2/router');
var hero_editor_1 = require('./hero-editor');
var hero_list_1 = require('./hero-list');
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
var HeroApp = (function () {
    function HeroApp() {
        this.title = 'Beloved Heroes';
    }
    HeroApp = __decorate([
        router_1.RouteConfig([
            { path: '/', component: hero_list_1.HeroList, as: 'Home' },
            { path: '/edit/:id', component: hero_editor_1.HeroEditor, as: 'Edit' },
            { path: '/add', component: hero_editor_1.HeroEditor, as: 'Add' }
        ]),
        angular2_1.Component({
            selector: 'heros-app',
            template: "\n        <h1>{{title}}</h1>\n<!--    <a [router-link]=\"['Home']\">Home</a>\n        <a [router-link]=\"['/Edit']\">Edit</a>-->\n        <router-outlet></router-outlet>",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], HeroApp);
    return HeroApp;
})();
exports.HeroApp = HeroApp;
//# sourceMappingURL=hero-app.js.map