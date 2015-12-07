import {Injectable} from 'angular2/angular2';
import {Http, Response} from 'angular2/http';
import Observable from '@reactivex/rxjs/dist/cjs/Observable'
import { Hero } from '../models/hero';
import {Quote} from "../models/quote";

@Injectable()
export class HeroService {
    heroes: Hero[];
    selectedHero : Hero;
    baseUrl : string;

    constructor(public http : Http) {
         /*this.heroes = [
         new Hero(1, 'Muhammad Ibn `Abd Allāh', 'Prophet', 'Kindness is a mark of faith, and whoever is not kind has no faith.'),
         new Hero(2, 'Abu Bakr Al-Siddiq', 'Companion'),
         new Hero(3, 'Umar ibn Al-Khattāb', 'Companion' ),
         new Hero(4, 'Uthman Ibn Affan', 'Companion'),
         new Hero(5, 'Ali ibn Abi Talib', 'Companion')
         ];*/
        this.baseUrl = 'src/app/data/';
    }

    fetchHeros() : Observable<Hero[]> {
         return this.http.get(`${this.baseUrl}heros.json`).map(response => response.json());
    }

    fetchQuotes() : Observable<Hero[]> {
        return this.http.get(`${this.baseUrl}quotes.json`)
                    .map(response => response.json())
    }

    find(id: string): Hero {
        return this.heroes.filter(c => c.id == id)[0];
    }

    remove(hero: Hero) {
        let index = this.heroes.indexOf(hero);
        this.heroes.splice(index, 1);
    }
}
