import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage: string = "";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private socketService: SocketService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.loginUser(this.loginForm.value)
      .subscribe(val => {
        if(typeof val == "string") {
          this.errorMessage = val;
        } else {
          this.authService.setLocalStorage(val);
          this.socketService.updateNavbar();
          this.router.navigate(['/']);
        }
      });
  }
}
