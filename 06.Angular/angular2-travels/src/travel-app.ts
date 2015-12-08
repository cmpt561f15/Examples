import {
    bootstrap,
    provide,
    Component
} from 'angular2/angular2';
import {
    ROUTER_DIRECTIVES,
    RouteConfig,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    APP_BASE_HREF
} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import { TravelService } from './travel-service'
import { TravelList } from './travel-list'
import { TravelEdit } from './travel-edit'


@RouteConfig([
    { path: '/',            component: TravelList, as: 'List' },
    { path: '/edit/:id',    component: TravelEdit, as: 'Edit' }
])
@Component({
    selector: 'travel-app',
    template: `
        <h1>Angular 2 : Sample Travels Application</h1>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class TravelApp {
    constructor() {
    }
}

bootstrap(TravelApp, [
    TravelService,
    ROUTER_PROVIDERS, HTTP_BINDINGS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(APP_BASE_HREF, {useValue: '/'})
]);


