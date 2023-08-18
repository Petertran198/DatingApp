import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFormData: any = {};
  @Input() users;
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter();

  register() {}

  cancel() {
    this.cancelRegister.emit(false);
  }
}
