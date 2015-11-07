import {
  Component,
  EventEmitter,
  Output,
  Input,
  CORE_DIRECTIVES
} from 'angular2/angular2';

@Component({
  selector: 'status',
  templateUrl: 'app/status.component.html',
  directives: [CORE_DIRECTIVES],
  styleUrls: ['app/status.component.css']
})
export class StatusComponent {
  isSelected: boolean;
  @Input() active: boolean;
  @Output() change: EventEmitter;
  constructor() {
    this.change = new EventEmitter();
    this.active = true;
    this.isSelected = false;
  }

  onClick() {
    if (!this.active) return;
    this.isSelected = !this.isSelected;
    this.change.next({status: this.isSelected});
  }
}

export interface StatusChangeEvent {
  status: boolean;
}