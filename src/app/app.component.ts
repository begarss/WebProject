import {Component, OnInit} from '@angular/core';
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OnlineComplaints';

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
