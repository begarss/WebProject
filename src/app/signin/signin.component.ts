import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {delayResponse} from 'angular-in-memory-web-api/delay-response';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {
  register;

  constructor(private userService: UserService ) { }

  ngOnInit() {
    this.register = {
      username: '',
      email: '',
      password: ''
    };
  }
  registerUser() {
    this.userService.registerUser(this.register).subscribe(
      response => {
        alert('User ' + this.register.username + ' has been created!')
      },
      error => console.log('error', error)
    );
  }
}
