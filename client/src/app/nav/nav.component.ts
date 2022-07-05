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
  // Made this service public to be able to use in .html template
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      (accountInfo) => {
        console.log(accountInfo);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.accountService.logOut();
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {},
      (error) => {
        console.log(error);
      }
    );
  }
}
