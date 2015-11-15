import {Component,  bootstrap, NgFor} from 'angular2/angular2';
@Component({
    selector: 'todo-app',
    template: `<h1>My Cool First Angular 2 App - {{title}}</h1>
                <p>My ToDos:</p>
                <ul>
                  <li *ng-for="#todo of todos">
                    {{ todo }}
                  </li>
                </ul>
              `,
    directives: [NgFor]
})
class AppComponent {
    title : string = 'ToDo App';
    todos : Array<string> =
        ['Pray', 'Play', 'Read', 'Write'];
}
bootstrap(AppComponent);