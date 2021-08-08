import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../models/review';
import { User } from '../models/user';

import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() bookId: string = "";  
  userId: number = 0;
  reviews: Review[] = [];
  readMore: boolean = false;
  userHasReview: boolean = false;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.userId = this.authService.getUserId();
    this.getReviewByUserAndBook();
  }

  getReviewByUserAndBook(): void {
    this.reviewService.getReviewByUserAndBook(this.userId, this.bookId)
      .subscribe(val => {
        // console.log("val:", typeof val);
        this.userHasReview = val;
      });
  }

  getReviews(): void {
    this.reviewService.getReviews(this.bookId)
      .subscribe(reviews => {
        this.reviews = reviews;
        // console.log(this.reviews);
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}
