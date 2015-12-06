import { Hero } from './../models/hero';
import {Injectable} from 'angular2/angular2';

@Injectable()
export class HeroService {
    heroes: Hero[];

    constructor() {
        this.heroes = [
            new Hero(1, 'Muhammad Ibn `Abd Allāh', 'Prophet', 'Kindness is a mark of faith, and whoever is not kind has no faith.'),
            new Hero(2, 'Abu Bakr Al-Siddiq', 'Companion'),
            new Hero(3, 'Umar ibn Al-Khattāb', 'Companion' ),
            new Hero(4, 'Uthman Ibn Affan', 'Companion'),
            new Hero(5, 'Ali ibn Abi Talib', 'Companion')
        ];
    }

    find(id: string): Hero {
        return this.heroes.filter(c => c.id == id)[0];
    }

    remove(travel: Hero) {
        let index = this.heroes.indexOf(travel);
        this.heroes.splice(index, 1);
    }
}
