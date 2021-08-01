import { Component, OnInit, Input } from '@angular/core';

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
  @Input() bookId: string = "";  
  userId: string = "";
  reviews: Review[] = [];
  users: User[] = [];
  currentUser?: User;
  readMore: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.getUsers();
  }

  getReviews(): void {
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
      });
  }

  // getUser(userId: string): void {
  //   this.userService.getUser(userId)
  //     .subscribe(users => {
  //       this.users = users;
  //       console.log(this.users);
  //     });
  // }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}
