import {Component, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';
import {Hero} from './hero'
import {KeyUpComponent} from "./keyup";
@Component({
    selector: 'heros-app',
    template: `
          <h1>{{title}}</h1>
          <input #new-hero
              (keyup.enter)="addHero(newHero)"
              (blur)="addHero(newHero)">

          <button (click)=addHero(newHero)>Add</button>

          <h2>My favorite hero is: {{myHero.name}}</h2>
          <p>Heroes:</p>
          <ul>
            <li *ng-for="#hero of heroes">
              {{ hero.name }}
              </li>
          </ul>
          <p *ng-if="heroes.length > 3">There are many heroes!</p>

          <keyup-form></keyup-form>
        `,
    directives: [CORE_DIRECTIVES, KeyUpComponent]
})
export class AppComponent {
    title = 'Beloved Heroes';
    heroes = [
        new Hero(1, 'Muhammad Ibn `Abd Allāh'),
        new Hero(2, 'Abu Bakr Al-Siddiq'),
        new Hero(3, 'Umar ibn Al-Khattāb'),
        new Hero(4, 'Uthman Ibn Affan'),
        new Hero(5, 'Ali ibn Abi Talib')
    ];
    myHero = this.heroes[0];

    addHero(newHero) {
        if (newHero.value) {
            //Set id to last id+1
            let id : number = this.heroes[this.heroes.length - 1].id + 1;
            this.heroes.push(new Hero(id, newHero.value));
            newHero.value = ''; // clear the newHero textbox
            console.log(this.heroes);
        }
    }
}
bootstrap(AppComponent);