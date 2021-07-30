import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  bookId: string = "";
  userId: string = "";

  reviews: Review[] = [];
  users: User[] = [];

  currentUser?: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reviewService: ReviewService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.getUsers();
  }

  getReviews(): void {
    this.bookId = String(this.route.snapshot.paramMap.get('bookId'));
    this.reviewService.getReviews(this.bookId)
      .subscribe(reviews => {
        this.reviews = reviews;
        // console.log(this.reviews);
      });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        // console.log(this.users);
      });
  }

  // getUser(userId: string): void {
  //   this.userService.getUser(userId)
  //     .subscribe(users => {
  //       this.users = users;
  //       console.log(this.users);
  //     });
  // }

  // viewComments.forEach(button => {
  //   button.addEventListener('click', () => {
  //     console.log("clicked button");
  //   })
  // });
  // onClickViewComments(): void {
  //   this.viewComments = true;
  // }
}
