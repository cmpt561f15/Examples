import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import { Hero } from './hero';
@Component({
    selector: 'hero-form',
    templateUrl: 'app/hero-form.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HeroFormComponent {
    heroTypes = ['Prophet', 'Companion', 'Scholar'];
    model = new Hero(1, 'Muhammad Ibn `Abd Allāh', this.heroTypes[0], 'Kindness is a mark of faith, and whoever is not kind has no faith.');
    submitted = false;
    onSubmit() { this.submitted = true; }
}