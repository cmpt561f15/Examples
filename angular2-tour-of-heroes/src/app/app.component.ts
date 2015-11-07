import {Component, provide} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';
import {Routes, APP_ROUTES} from './route.config';
import {HeroService} from "./hero.service";

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
  title = 'Tour of Heroes';
  routes = Routes;
}
