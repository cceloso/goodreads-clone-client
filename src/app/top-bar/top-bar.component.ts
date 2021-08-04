import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
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
