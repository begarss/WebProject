import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Observable} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'servicesGroup2';

  LoginStatus$ : Observable<boolean>;

  UserName$ : Observable<string>;
  IsAdmin$ : Observable<boolean>;
  lol:boolean;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.LoginStatus$ = this.userService.isLoggesIn;
    this.IsAdmin$ = this.userService.currentUserIsAdmin;
    // this.lol=this.userService.checkAdmin();
    console.log('admin'+this.IsAdmin$);
    console.log('login'+this.LoginStatus$);

    this.UserName$ = this.userService.currentUserName;
  }

  onLogout()
  {
    // this.lol=this.userService.checkAdmin();
    // window.location.reload();

    this.userService.logout();
  }

}
