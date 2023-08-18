import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserDto } from '../DTO/UserDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }
  toggleRegister(status: boolean) {
    this.registerMode = status;
  }

  getUsers() {
    this.http.get<UserDto[]>('https://localhost:5001/api/users').subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}
