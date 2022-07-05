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

  ngOnInit(): void {
    this.getCurrentUser();
  }

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
    this.accountService.logOut();
    this.isLoggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {
        //If there is a user set to true if not set to false.
        //!! just converts it to a boolean
        this.isLoggedIn = !!user;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
