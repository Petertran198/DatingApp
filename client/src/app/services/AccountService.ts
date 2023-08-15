import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../DTO/UserDto';
import { LoginUser } from '../DTO/LoginUserDto';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  login(userInfo: LoginUser) {
    this.http.post(this.baseUrl + 'account/login', userInfo).subscribe({
      next: (respose: UserDto) => {
        console.log(respose);
      },
      error: (e) => console.error(e),
    });
  }
}
