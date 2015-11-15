import {Component, bootstrap, provide} from 'angular2/angular2';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy} from 'angular2/router';


// Home Component
@Component({
    selector: 'home',
    template: '<h1 class="home">Home Component</h1>',
    styles: ['.home {background: red}'],
})
export class HomeComponent {}

// Product Details Component
@Component({
    selector: 'product',
    template: `<h1 class="product">Product Detail for Product: {{productID}}</h1>` , // 1
    styles: ['.product {background: cyan}']})
/*
 - The constructor of this component requests Angular to inject the object RouteParams,
  which contains all parameters that are passed to this component.
  In TypeScript you just need to declare the argument specifying its type,
  and Angular will know how to instantiate and inject this object.
 - the constructor of the ProductDetailComponent needs an extra argument of type
 RouteData to read data passed by @RouteConfig
 Passing data to a route with RouteData is not an alternative to RouteParams.
 While RouteParams is used to pass the data from one component to another based
 on the user’s selections (e.g. show details of the selected product),
 RouteData can come handy when you need to pass some data to a route during
 the configuration phase, e.g. is it a production or QA environment.
 */
export class ProductDetailComponent {
    productID:string;

    constructor(params:RouteParams, data: RouteData) {
        this.productID = params.get('id');

        console.log(`Is this prod environment: ${data.get('isProd')}`);
    }
}

// Root Component
/*
 This time there are two elements in the array given to router-link.
 The first one is the name of the route and the second is a JavaScript object
 containing a name/value pair that represents the parameter to be passed
 to the /ProductDetail route. For simplicity we’ve hardcoded the id to be 1234,
 but if we had a variable product pointing to the corresponding object,
 we could have written {id: product.id} here.
 */
@Component({
    selector: 'heros-app',
    template: `<a [router-link]="['Home']">Home</a>
           <a [router-link]="['ProductDetail', {id: 1234}]">Product Details</a>
           <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]})

/*
 - The path property has an additional fragment /:id.
 The name of this URL fragment must match the name of the parameter property
 used in router-link. Angular will construct the URL fragment /product/1234
 for this ProductDetail route.
 - Angular also offers a mechanism to pass additional data to components at
 the time of the route configuration. For example, besides the data that
 a component needs for implementing application logic, we may need to pass
 a flag indicating if the application runs in production environment or not.
 This can be done by using the data property of the @RouteConfig annotation.
 */
@RouteConfig([
    {path: '/',            component: HomeComponent, as: 'Home'},
    {path: '/product/:id', component: ProductDetailComponent, as: 'ProductDetail'
        , data: {isProd: true}}
])

export class RouterExampleRootComponent{
}

bootstrap(RouterExampleRootComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);