import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string = "";
  userId?: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.userService.getProtected()
    //   .subscribe(val => {
    //     if(val) {
    //       console.log(val);
    //       this.message = "You are authenticated!";
    //     }
    //   },
    //   (err) => {
    //     console.log("err:", err);
    //     if(err.status === 401) {
    //       this.message = "You are not authorized to visit this route.";
    //     }
    //   },
    //   () => {
    //     console.log("HTTP request done");
    //   });
    this.userId = this.authService.getUserId();
  }
}
