import {Component, provide} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { bootstrap } from 'angular2/platform/browser';
import {
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {StarsApp} from './components/stars-app';
//import {HeroService} from "./services/hero-service";

bootstrap(StarsApp,
    [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);