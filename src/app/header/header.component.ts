import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Observable} from "rxjs";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'servicesGroup2';

  LoginStatus$ : Observable<boolean>;
  UserId$ : Observable<string>;

  UserName$ : Observable<string>;
  IsAdmin$ : Observable<boolean>;
  lol:boolean;
  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    this.LoginStatus$ = this.userService.isLoggesIn;
    this.IsAdmin$ = this.userService.currentUserIsAdmin;
    this.UserId$ = this.userService.currentUserId;
    console.log('admin'+this.IsAdmin$);
    console.log('login'+this.LoginStatus$);

    this.UserName$ = this.userService.currentUserName;
  }

  onLogout()
  {
    // this.lol=this.userService.checkAdmin();
    // window.location.reload();
    this.router.navigate(['/home']);

    this.userService.logout();
  }

  Number(UserId: string) {
    return +UserId;
  }
}
