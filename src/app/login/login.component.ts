import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'servicesGroup2';

  logged = false;

  username = '';
  password = '';

  constructor(private postService: PostService) {}

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
  }

  login() {
    this.postService.login(this.username, this.password)
      .subscribe(res => {

        localStorage.setItem('token', res.token);

        this.logged = true;

        this.username = '';
        this.password = '';
      });
  }

  logout() {
    localStorage.clear();
    this.logged = false;
  }
}
