//main entry point
import {bootstrap, provide} from 'angular2/angular2';
import {HTTP_BINDINGS} from 'angular2/http';
import {App} from './app';
import {PeopleService} from './peopleService'

bootstrap(App, [HTTP_BINDINGS])
  .catch(err => console.error(err));