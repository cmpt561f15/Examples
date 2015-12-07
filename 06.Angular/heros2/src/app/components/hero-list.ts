import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import Observable from '@reactivex/rxjs/dist/cjs/Observable'
import {Hero} from '../models/hero'
import {Quote} from '../models/quote'
import {HeroViewer} from './hero-show'
import {HeroService} from "../services/hero-service";

@Component({
    selector: 'heros-app',
    template: `
       <div *ng-if="heroService.heroes">
          <table>
            <tr *ng-for="#hero of heroService.heroes">
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
          <h2>Selected hero: {{heroService.selectedHero.name}}</h2>
          <hero-show [hero]="heroService.selectedHero"></hero-show>
        </div>
        `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, HeroViewer ]
})
export class HeroList {
    constructor(public heroService : HeroService) {
    }

    //auto-executed during the component initialization
    ngOnInit() {
        //If the heroes list is undefined then fetch the data from REST service
        if (!this.heroService.heroes) {
            //After getting the heros -> get their quotes
            //This is a demo of two async call done in sequence
            this.heroService.fetchHeros().subscribe((heroes:Hero[]) => {
                this.heroService.fetchQuotes().subscribe(
                    (quotes:Quote[]) => {
                        console.log('Quotes', quotes);

                        for (let quote of quotes) {
                            let indx = heroes.findIndex(h => h.id === quote.heroId);
                            heroes[indx].quote = quote.quote;
                        }
                        console.log('Heroes', heroes);
                        this.heroService.heroes = heroes;
                        this.heroService.selectedHero = heroes[0];
                    },
                    (err) => console.error('There was an error: ' + err),
                    () => console.log('Completed!')
                );
            });
        }
    }

    select(hero: Hero) {
        this.heroService.selectedHero = hero;
        return false;
    }
    remove(hero: Hero) {
        this.heroService.remove(hero);
        return false;
    }
}