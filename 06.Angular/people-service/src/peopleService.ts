//a simple service
import {Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http';

@Injectable()
export class PeopleService {
  departments : string[];

  constructor(public http: Http) {
    this.departments = ['CSE', 'EE', 'ME'];
  }

  getPeople() {
    return this.http.get('api/people.json')
        .map(response => response.json());
  }
}