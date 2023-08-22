import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/AccountService';
import { RegisterUser } from '../_dto/RegisterUserDto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFormData: RegisterUser = {
    username: '',
    password: '',
  };
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter();
  errorMessage: string;

  constructor(private accountService: AccountService) {}

  register() {
    this.accountService.registerUser(this.registerFormData).subscribe({
      next: (registeredUser) => {
        console.log(registeredUser);
        this.closeRegisterForm();
      },
      error: (errMsg) => {
        this.errorMessage = errMsg.error;
      },
    });
  }

  closeRegisterForm() {
    this.cancelRegister.emit(false);
  }
}
