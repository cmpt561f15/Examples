var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
//First we import all router-related directives and classes from ‘angular2/router’.
var router_1 = require('angular2/router');
var hero_1 = require('./hero');
var hero_form_component_1 = require('./hero-form.component');
var router_example_1 = require('./router-example');
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Beloved Heroes';
        this.heroes = [
            new hero_1.Hero(1, 'Muhammad Ibn `Abd Allāh', 'Prophet', 'Kindness is a mark of faith, and whoever is not kind has no faith.'),
            new hero_1.Hero(2, 'Abu Bakr Al-Siddiq', 'Companion'),
            new hero_1.Hero(3, 'Umar ibn Al-Khattāb', 'Companion'),
            new hero_1.Hero(4, 'Uthman Ibn Affan', 'Companion'),
            new hero_1.Hero(5, 'Ali ibn Abi Talib', 'Companion')
        ];
        this.myHero = this.heroes[0];
    }
    AppComponent = __decorate([
        angular2_1.Component({
            //selector: 'heros-app',
            template: "\n          <h1>{{title}}</h1>\n          <hero-form></hero-form>\n\n          <h2>My favorite hero is: {{myHero.name}}</h2>\n          <p>Heroes:</p>\n          <ul>\n            <li *ng-for=\"#hero of heroes\">\n              {{ hero.name }}\n              </li>\n          </ul>\n          <p *ng-if=\"heroes.length > 3\">There are many heroes!</p>\n        ",
            directives: [angular2_1.CORE_DIRECTIVES, hero_form_component_1.HeroFormComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
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
var RootComponent = (function () {
    function RootComponent() {
    }
    RootComponent = __decorate([
        router_1.RouteConfig([
            { path: '/', component: AppComponent, as: 'Home' },
            { path: '/hero', component: hero_form_component_1.HeroFormComponent, as: 'Hero' },
            { path: '/router', component: router_example_1.RouterExampleRootComponent, as: 'Router' }
        ]),
        angular2_1.Component({
            selector: 'heros-app',
            template: "<a [router-link]=\"['Home']\">Home</a>\n    <a [router-link]=\"['Hero']\">Hero</a>\n    <a [router-link]=\"['Router']\">Router Example</a>\n    <router-outlet></router-outlet>",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RootComponent);
    return RootComponent;
})();
/*
 During the application bootstrap we specify dependencies of the RootComponent in the square brackets.
 Providers are used to register objects for dependency injection.
 At this point we want Angular to instantiate the router objects using the definitions
 from ROUTER_PROVIDERS. While the default location strategy is PathLocationStrategy,
 we’re using the class HashLocationStrategy for hash-based routing.

 The location strategy defines how the application will interact with browser’s URL.
 We use HashLocationStrategy, which means that if we configure the router with the fragment
 ‘/hero’, Angular will add the hash sign and this fragment to the base URL.
 The browser will treat the fragment after the hash sign as an identifier of
 a specific client-side route.
 */
//bootstrap(RootComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]); 
//# sourceMappingURL=app.js.map