import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.checkIfAuthenticated();
    // this.isLoggedIn = this.authService.isLoggedIn();
    // console.log("isLoggedIn:", this.isLoggedIn);
  }

  onLogout(): void {
    // localStorage.clear();
    this.authService.logout();
    this.isLoggedIn = false;
    // this.isLoggedIn = this.authService.isLoggedOut();
    this.router.navigate(['/login'])
  }

  checkIfAuthenticated(): void {
    this.userService.getProtected()
      .subscribe(val => {
        if(val) {
          console.log(val);
          this.isLoggedIn = true;
        }
      },
      (err) => {
        console.log("err:", err);
        this.isLoggedIn = false;
      });
  }
}
