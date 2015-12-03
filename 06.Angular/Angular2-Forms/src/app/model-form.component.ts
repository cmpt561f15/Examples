import {
  FORM_DIRECTIVES,
  AbstractControl,
  ControlGroup,
  Validators,
  NgFormModel,
  FormBuilder,
  NgIf,
  NgFor,
  Component,
  Directive,
  View
} from 'angular2/angular2';

import { Hero } from './hero';

@Component({
  selector: 'model-driven-form',
  templateUrl: 'app/model-form.component.html',
  directives: [FORM_DIRECTIVES, NgFor]
})
export class ModelFormComponent {
  form: ControlGroup;
  model: Hero;  
  powers: string[];
  submitted: boolean = false;
  
  constructor(fb: FormBuilder) {
      this.model = new Hero(18, 'Dr IQ', 'Really Smart', 'Chuck Overstreet');
      
      this.powers = ['Really Smart', 'Super Flexible', 
                     'Hypersound', 'Weather Changer'];                     
                     
      this.form = fb.group({
        name:     [this.model.name, Validators.required],
        alterEgo: [this.model.alterEgo, Validators.required],
        power:    [this.model.power, Validators.required]
      });
                     
  }

  onSubmit(): void {
    this.submitted = true;
  }
}