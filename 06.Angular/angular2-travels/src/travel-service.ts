import { Travel } from './travel'
import {Injectable, Observable} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class TravelService {
    travels: Travel[];
    baseUrl : string;
    /*[
            new Travel("SF2015", "San Francisco", "USA", 2015, "sanfrancisco.jpg"),
            new Travel("NA2014", "Nantes", "France", 2014, "nantes.jpg"),
            new Travel("BX2014", "Bruxelles", "Belgique", 2014, "bruxelles.jpg"),
            new Travel("YO2014", "Yosemite", "USA", 2014, "yosemite.jpg"),
            new Travel("BT2013", "Bretagne", "France", 2013, "bretagne.jpg")
    ];*/

    constructor(public http : Http) {
        this.baseUrl = '../';
    }

    fetchTravels() : Observable<Travel[]> {
        return this.http.get(`${this.baseUrl}data.json`).map(response => response.json());
    }

    find(id: string): Travel {
        return this.travels.filter(c => c.id == id)[0];
    }

    remove(travel: Travel) {
        let index = this.travels.indexOf(travel);
        this.travels.splice(index, 1);
    }
}