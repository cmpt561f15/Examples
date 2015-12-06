var angular2_1 = require('angular2/angular2');
//First we import all router-related directives and classes from ‘angular2/router’.
var router_1 = require('angular2/router');
var hero_app_1 = require('./components/hero-app');
var hero_service_1 = require("./services/hero-service");
/*
 During the application bootstrap we specify dependencies of the HeroApp in the square brackets.
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
angular2_1.bootstrap(hero_app_1.HeroApp, [hero_service_1.HeroService,
    router_1.ROUTER_PROVIDERS,
    angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
//# sourceMappingURL=bootstrap.js.map