import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogIn, ISignUp } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    'Content-Type': 'application/json',
  };
  constructor(private http: HttpClient) {}

  logIn(body: ILogIn): Observable<any> {
    return this.http.post(`http://localhost:8080/auth/logIn`, body, {
      withCredentials: true,
    });
  }

  signUp(body: ISignUp) {
    console.log(localStorage.getItem('auth_app_token'));
    return this.http.post(`http://localhost:8080/auth/signup`, body, {
      withCredentials: true,
    });
  }
}
