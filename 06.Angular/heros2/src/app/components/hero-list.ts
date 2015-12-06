import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Hero} from '../models/hero'
import {HeroViewer} from './hero-show'
import {HeroService} from "../services/hero-service";

@Component({
    selector: 'heros-app',
    template: `
          <h2>Selected hero: {{selectedHero.name}}</h2>
          <p>Heroes:</p>
          <table>
            <tr *ng-for="#hero of heroes">
                <td>
                  {{ hero.name }}
                </td>
                <td>
                    <a href (click)="select(hero)" class="pure-button">
                        <i class="fa fa-caret-square-o-down"></i> Show
                    </a>
                    <a href [router-link]="['/Edit', {id: hero.id}]" class="pure-button">
                        <i class="fa fa-pencil-square-o"></i> Edit
                    </a>
                    <a href (click)="remove(hero)" class="pure-button">
                        <i class="fa fa-trash-o"></i> Remove
                    </a>
                </td>
          </tr>
          </table>
          <hero-show [hero]="selectedHero"></hero-show>
        `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, HeroViewer ]
})
export class HeroList {
    selectedHero : Hero;
    heroes : Hero[];
    constructor(public heroService : HeroService) {
        this.heroes = this.heroService.heroes;
        this.selectedHero = this.heroes[0];
    }

    select(hero: Hero) {
        this.selectedHero = hero;
        return false;
    }
    remove(hero: Hero) {
        this.heroService.remove(hero);
        return false;
    }
}