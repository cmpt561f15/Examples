System.register(['angular2/core', 'angular2/platform/browser', 'angular2/router', 'angular2/http', './components/hero-app', "./services/hero-service"], function(exports_1) {
    var core_1, browser_1, router_1, http_1, hero_app_1, hero_service_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (hero_app_1_1) {
                hero_app_1 = hero_app_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
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
            browser_1.bootstrap(hero_app_1.HeroApp, [
                hero_service_1.HeroService,
                router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
            ]);
        }
    }
});
