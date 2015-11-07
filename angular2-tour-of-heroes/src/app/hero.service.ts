import {HEROES} from './mock-heroes';
import {Hero} from "./hero.model";

export class HeroService {
  getHeroes(): Promise<Hero[]> { return Promise.resolve(HEROES); }

  getHero(id: number): Promise<Hero> {
    return Promise.resolve(HEROES).then((heroes) => {
      for (var hero of heroes) {
        if (hero.id === id) {
          return hero;
        }
      }
    });
  }
}
