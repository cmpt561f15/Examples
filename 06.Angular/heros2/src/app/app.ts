import {Component, bootstrap, provide, CORE_DIRECTIVES} from 'angular2/angular2';
//First we import all router-related directives and classes from ‘angular2/router’.
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
    LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {Hero} from './hero'
import {HeroFormComponent} from './hero-form.component'

@Component({
    //selector: 'heros-app',
    template: `
          <h1>{{title}}</h1>
          <hero-form></hero-form>

          <h2>My favorite hero is: {{myHero.name}}</h2>
          <p>Heroes:</p>
          <ul>
            <li *ng-for="#hero of heroes">
              {{ hero.name }}
              </li>
          </ul>
          <p *ng-if="heroes.length > 3">There are many heroes!</p>
        `,
    directives: [CORE_DIRECTIVES, HeroFormComponent ]
})
export class AppComponent {
    title = 'Beloved Heroes';
    heroes = [
        new Hero(1, 'Muhammad Ibn `Abd Allāh', 'Prophet', 'Kindness is a mark of faith, and whoever is not kind has no faith.'),
        new Hero(2, 'Abu Bakr Al-Siddiq', 'Companion'),
        new Hero(3, 'Umar ibn Al-Khattāb', 'Companion' ),
        new Hero(4, 'Uthman Ibn Affan', 'Companion'),
        new Hero(5, 'Ali ibn Abi Talib', 'Companion')
    ];
    myHero = this.heroes[0];
}

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
    {path: '/', component: AppComponent, as: 'Home'},
    {path: '/hero', component: HeroFormComponent, as: 'Hero'  }
])
@Component({
    selector: 'heros-app',
    template: `<a [router-link]="['Home']">Home</a>
    <a [router-link]="['/Hero']">Hero</a>
    <router-outlet></router-outlet>`,
    directives: [ ROUTER_DIRECTIVES]
})

class RootComponent{
}

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
bootstrap(RootComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);