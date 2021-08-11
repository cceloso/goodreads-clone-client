import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    imageUrl: ['']
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
    console.log(this.signupForm.value);
    this.userService.signupUser(this.signupForm.value)
      .subscribe(val => {
        if(typeof val == "string") {
          this.errorMessage = val;
        } else {
          console.log("added user!");
          console.log("val from signup onsubmit", val);
          this.authService.setLocalStorage(val);
          this.userService.updateNavbar();
          this.router.navigate(['/']);
        }
      });
  }
}
