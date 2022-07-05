import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('userInfo'));
    this.accountService.setCurrentUser(user);
  }
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.log({ error });
      }
    );
  }
}
