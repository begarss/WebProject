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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.LoginStatus$ = this.userService.isLoggesIn;

    this.UserName$ = this.userService.currentUserName;
  }

  onLogout()
  {
    this.userService.logout();
  }

}
