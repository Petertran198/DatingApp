import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/AccountService';
import { LoginUser } from '../_dto/LoginUserDto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loginUser: LoginUser = {
    username: '',
    password: '',
  };
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((u) => {
      console.log(u);
    });
  }

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
