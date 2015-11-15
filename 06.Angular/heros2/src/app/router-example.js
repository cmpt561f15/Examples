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
var router_1 = require('angular2/router');
// Home Component
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        angular2_1.Component({
            selector: 'home',
            template: '<h1 class="home">Home Component</h1>',
            styles: ['.home {background: red}'],
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
// Product Details Component
var ProductDetailComponent = (function () {
    function ProductDetailComponent(params, data) {
        this.productID = params.get('id');
        console.log("Is this prod environment: " + data.get('isProd'));
    }
    ProductDetailComponent = __decorate([
        angular2_1.Component({
            selector: 'product',
            template: "<h1 class=\"product\">Product Detail for Product: {{productID}}</h1>",
            styles: ['.product {background: cyan}'] }), 
        __metadata('design:paramtypes', [router_1.RouteParams, router_1.RouteData])
    ], ProductDetailComponent);
    return ProductDetailComponent;
})();
exports.ProductDetailComponent = ProductDetailComponent;
// Root Component
/*
 This time there are two elements in the array given to router-link.
 The first one is the name of the route and the second is a JavaScript object
 containing a name/value pair that represents the parameter to be passed
 to the /ProductDetail route. For simplicity we’ve hardcoded the id to be 1234,
 but if we had a variable product pointing to the corresponding object,
 we could have written {id: product.id} here.
 */
var RouterExampleRootComponent = (function () {
    function RouterExampleRootComponent() {
    }
    RouterExampleRootComponent = __decorate([
        angular2_1.Component({
            selector: 'heros-app',
            template: "<a [router-link]=\"['Home']\">Home</a>\n           <a [router-link]=\"['ProductDetail', {id: 1234}]\">Product Details</a>\n           <router-outlet></router-outlet>",
            directives: [router_1.ROUTER_DIRECTIVES] }),
        router_1.RouteConfig([
            { path: '/', component: HomeComponent, as: 'Home' },
            { path: '/product/:id', component: ProductDetailComponent, as: 'ProductDetail',
                data: { isProd: true } }
        ]), 
        __metadata('design:paramtypes', [])
    ], RouterExampleRootComponent);
    return RouterExampleRootComponent;
})();
exports.RouterExampleRootComponent = RouterExampleRootComponent;
angular2_1.bootstrap(RouterExampleRootComponent, [router_1.ROUTER_PROVIDERS, angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
//# sourceMappingURL=router-example.js.map