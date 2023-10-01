import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent {
  @Input()
  label!: string;
  @Input()
  default!: string;
  @Input()
  control!: FormControl;
  @Input()
  placeholder!: string;
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input()
  icon!: string;
}
