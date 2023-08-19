import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/AccountService';
import { LoginUser } from '../DTO/LoginUserDto';
import { Router } from '@angular/router';

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
  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginUser).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      },
      error: (errorMsg) => console.error(errorMsg),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
