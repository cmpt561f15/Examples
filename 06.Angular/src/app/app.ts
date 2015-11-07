import {Component, bootstrap} from 'angular2/angular2';
@Component({
    selector: 'my-app',
    template: '<h1>My Cool First Angular 2 App {{title}}</h1>'
})
class AppComponent {
    title : string = 'Salam';
}
bootstrap(AppComponent);