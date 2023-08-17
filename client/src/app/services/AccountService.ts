import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../DTO/UserDto';
import { LoginUser } from '../DTO/LoginUserDto';
import { BehaviorSubject, map } from 'rxjs';
import { RegisterUser } from '../DTO/RegisterUserDto';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(userInfo: LoginUser) {
    //returns a UserDto
    return this.http
      .post<UserDto>(this.baseUrl + 'account/login', userInfo)
      .pipe(
        map((response) => {
          const user = response;
          if (user) {
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
            this.setCurrentUser(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  //Primary purpose is to retrieve users that are in localstorage for persistence
  setCurrentUser(user: UserDto) {
    this.currentUserSubject.next(user);
  }

  registerUser(userInfo: RegisterUser) {
    this.http.post<UserDto>(this.baseUrl + 'account/register', userInfo).pipe(
      map((response) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    );
  }
}
