import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {DashboardComponent} from './dashboard.component';
import {RouteDefinition} from 'angular2/router';

export const Routes = {
  dashboard: {
    path: '/',
    as: 'Dashboard',
    component: DashboardComponent,
    link: ['/Dashboard']
  },
  heroes: {
    path: '/heroes',
    as: 'Heroes',
    component: HeroesComponent,
    link: ['/Heroes']
  },
  detail: {
    path: '/detail/:id',
    as: 'Detail',
    component: HeroDetailComponent,
    link: ['/Detail']
  }
};

export const APP_ROUTES: RouteDefinition[] =
    Object.keys(Routes).map((name) => Routes[name]);