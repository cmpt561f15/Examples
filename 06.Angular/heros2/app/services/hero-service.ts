import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hero } from '../models/hero';
import {Headers} from "angular2/http";

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
        this.baseUrl = 'http://localhost:9080/api/heros';
    }

    fetchHeros() : Observable<Hero[]> {
         return this.http.get(this.baseUrl).map(response => response.json());
    }

    find(id: string): Hero {
        return this.heroes.filter(c => c._id == id)[0];
    }

    remove(hero: Hero) {
        console.log("Hero to be deleted", JSON.stringify(hero));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.delete(`${this.baseUrl}/${hero._id}`)
          .subscribe(
                (response: Response) => {
                    console.log('Delete done sucessfully');
                    let index = this.heroes.indexOf(hero);
                    this.heroes.splice(index, 1);
                    if (this.heroes.length > 0) {
                        this.selectedHero = this.heroes[0];
                    }
                });
    }

    update(hero: Hero) {
        console.log("Hero to be updated", JSON.stringify(hero));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.put(`${this.baseUrl}/${hero._id}`,
            JSON.stringify(hero),
            {headers:headers})
            .map((res: Response) => res.json())
            .subscribe(
                (updatedHero:Hero) => {
                    console.log("updatedHero", updatedHero);
                });
    }

    add(hero:Hero) {
        delete hero._id;
        console.log("Hero to add", JSON.stringify(hero));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.baseUrl,
            JSON.stringify(hero),
            {headers:headers})
            .map((res: Response) => res.json())
            .subscribe(
                (addedHero:Hero) => {
                    this.heroes.push(addedHero);
                    this.selectedHero = addedHero;
                    console.log("addedHero", addedHero);
            });
    }
}