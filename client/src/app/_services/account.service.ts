import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseurl: string = 'https://localhost:5001/api/';
  //ReplaySubject is a type of Subject that replays the old values to new subscriber when they first subscribe to this varable.The first param tells us how many values we want to store and retrieve.
  //It is best pratice to set ur Subject as private and then ur Observable as public
  private currentUserSource = new ReplaySubject<User>();
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseurl + 'account/login', model).pipe(
      map((resp: User) => {
        const user = resp;
        //If user is available save user session to localstorage cookies
        if (user) {
          localStorage.setItem('userInfo', JSON.stringify(user));
          //Once user logs in set Subject to be the user
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logOut() {
    localStorage.removeItem('userInfo');
    this.currentUserSource.next(null);
  }
}
