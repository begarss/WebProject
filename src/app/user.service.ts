import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginResponse} from "./models";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
// import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  BASE_URL = 'http://127.0.0.1:8000';

  // User related properties
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserId = (localStorage.getItem('userid'));

  registerUser(userData): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/users/', userData);
  }

  login(username, password): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/api/login/`, {
      username,
      password
    }).pipe(
      map(result => {

        // login successful if there's a jwt token in the response
        if (result && result.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('userid', String(result.userid));
          this.router.navigate(['/home']);

          this.UserName.next(localStorage.getItem('username'));
          // this.UserId.next(localStorage.getItem('userRole'));
        }
        return result;
      })
    );
  }//end of login

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged Out Successfully");
  }

  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem("loginStatus");

    if (loginCookie == "1") {
      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }

      // Get and Decode the Token
      const token = localStorage.getItem('jwt');
      // const decoded = jwt_decode(token);
      // Check if the cookie is valid

      // if (decoded.exp === undefined) {
      //   return false;
      // }
      return true;
    }
    return false;
  }

  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserId() {
    return this.UserId;
  }

}

