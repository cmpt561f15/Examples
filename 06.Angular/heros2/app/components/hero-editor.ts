import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router';
import { Hero } from '../models/hero';
import {HeroService} from "../services/hero-service";

@Component({
    selector: 'hero-form',
    templateUrl: 'app/components/hero-form.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HeroEditor {
    heroTypes = ['Prophet', 'Companion', 'Scholar'];
    hero: Hero;

    constructor(public heroService: HeroService, public router: Router, params: RouteParams) {
        console.log('params.get("id") : ', params.get('id'));
        if (params.get('id') != null) {
            this.hero = heroService.find(params.get('id'));
            this.heroService.selectedHero = this.hero;
        } else {
            console.log('Entered HeroEditor add mode');
            this.hero = new Hero('', '', '');
        }
    }

    onSubmit() {
        if (this.hero._id === '') {
            this.heroService.add(this.hero);
        } else {
            this.heroService.update(this.hero);
        }
        this.router.navigate(['/Home']);
    }
}