import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
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
    private authService: AuthService,
    private socketService: SocketService,
    private userService: UserService,
  ) {  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.isLoggedIn()
    .subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    
    this.socketService.newUserState
      .subscribe(() => {
        this.isLoggedIn = true;
        this.userId = this.authService.getUserId();
      });
  }

  onLogout(): void {
    this.authService.logout();
    this.userId = 0;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    const searchParam = this.searchForm.value.searchParam;

    this.searchForm.setValue({
      searchParam: ''
    });

    this.router.navigate(['/search'], { queryParams: { q: searchParam} });
  }
}
