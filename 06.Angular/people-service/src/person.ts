//a simple person component
import {Component, View, EventEmitter} from 'angular2/angular2'

@Component({
  selector: 'cmp-person',
  inputs: ['name'],
  outputs: ['hello']
  template: `
    <div>
      <span>{{name}}</span>
      <button (click)="sayHelloEvent()">Say Hello</button>
    </div>
  `
})
export class Person {
  hello = new EventEmitter();
  sayHelloEvent(e) {
    this.hello.next(this.name);
  }
}