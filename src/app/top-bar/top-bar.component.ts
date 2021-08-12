import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: number = 0;

  searchForm = this.fb.group({
    searchParam: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
  ) {  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.isLoggedIn()
    .subscribe(isLoggedIn => {
      console.log("val from login observable:", isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });
    
    this.userService.newUserState
      .subscribe(() => {
        console.log("newUserState triggered in top bar");
        this.isLoggedIn = true;
      });
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    const searchParam = this.searchForm.value.searchParam;
    console.log(this.searchForm.value);
    console.log(searchParam);

    this.searchForm.setValue({
      searchParam: ''
    });

    this.router.navigate(['/search'], { queryParams: { q: searchParam} });
  }
}
