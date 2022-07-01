import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  isLoggedIn: Boolean;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (accountInfo) => {
        console.log(accountInfo);
        this.isLoggedIn = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.isLoggedIn = false;
  }
}
