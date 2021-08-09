import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
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
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.userService.loginUser(this.loginForm.value)
      .subscribe(val => {
        // console.log(typeof val == "string");
        // console.log(val.includes("Invalid"));
        
        if(typeof val == "string") {
          this.errorMessage = val;
          console.log("invalid");
        } else {
          console.log("logged in user!");
          console.log("val from login onSubmit:", val);
          this.authService.setLocalStorage(val);
          this.router.navigate(['/']);
        }
      });
  }
}
