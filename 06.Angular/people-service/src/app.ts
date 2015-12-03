//our root app component
import {Component, View} from 'angular2/angular2'
import {PeopleService} from './peopleService'
import {Person} from './person'

@Component({
  selector: 'my-app',
  providers: [PeopleService],
  template: `
    <div>
      <h2>Hello Angular2!</h2>
      <cmp-person
        *ng-for="#person of people" 
        [name]="person.name"
        (hello)="onSayHello($event)">
      </cmp-person>
    </div>
  `,
  directives: [Person]
})
export class App {
  constructor(peopleService:PeopleService) {
    peopleService.getPeople()
      .subscribe(
        people => this.people = people,
        console.error('Call failed'),
        () => console.log('Completed!')
      );
  }
  onSayHello($event){
    alert(`You said hello to ${$event}`)
  }
}