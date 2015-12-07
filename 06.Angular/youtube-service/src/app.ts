//our root app component
import {Component, View, Control} from 'angular2/angular2'
import {YouTube} from './youtube'

@Component({
  selector: 'my-app',
  providers: [YouTube]
})
@View({
  template: `
    <h1>YouTube Search</h1>
    <input [ng-form-control]="search">
    <div *ng-for="#video of results | async">
      <h3>{{video.snippet.title}}</h3>
      <p>{{video.snippet.title}}</p>
      <img [src]="video.snippet.thumbnails.default.url">
      <p>
        <span>{{(video.id.kind)}} : </span>
        <a *ng-if="video.id.kind === 'youtube#video'" target="_blank" href="https://www.youtube.com/watch?v={{video.id.videoId}}">
          https://www.youtube.com/watch?v={{video.id.videoId}}
        </a>
        <a *ng-if="video.id.kind === 'youtube#channel'" target="_blank" href="https://www.youtube.com/channel/{{video.id.channelId}}">
          https://www.youtube.com/channel/{{video.id.channelId}}
        </a>

      </p>
      <div>{{video | json }}</div>
    </div>
   
  `,
  directives: []
})
export class App {
  search = new Control();
  constructor(public youtube:YouTube) {
    //search input (observable!)
    this.results = this.search.valueChanges
      .debounceTime(150)  //wait for 150 milliseconds
      .switchMap(text => this.youtube.search(text));  //pass the observable from search textbox to youtube search
  }
  
}