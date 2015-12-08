import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router';
import { Hero } from '../models/hero';
import {HeroService} from "../services/hero-service";

@Component({
    selector: 'hero-form',
    templateUrl: 'src/app/components/hero-form.html',
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
            this.hero = new Hero(0, '', '');
        }
    }

    onSubmit() {
        if (this.hero.id === 0) {
            this.heroService.add(this.hero);
        }
        this.router.navigate(['/Home']);
    }
}