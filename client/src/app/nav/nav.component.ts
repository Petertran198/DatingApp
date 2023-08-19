import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/AccountService';
import { LoginUser } from '../DTO/LoginUserDto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginUser).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      },
      error: (errorMsg) => {
        this.toastr.error(errorMsg.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
  }
}
