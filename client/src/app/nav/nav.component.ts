import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/AccountService';
import { LoginUser } from '../DTO/LoginUserDto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loginUser: LoginUser = {
    Username: '',
    Password: '',
  };

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginUser);
  }
}
