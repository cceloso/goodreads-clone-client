import { Component, OnInit } from '@angular/core';

import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reviews-by-user',
  templateUrl: './reviews-by-user.component.html',
  styleUrls: ['./reviews-by-user.component.css']
})
export class ReviewsByUserComponent implements OnInit {
  reviews: Review[] = [];
  userId: string = "1";

  constructor(
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.getReviewsByUser();
  }

  getReviewsByUser(): void {
    this.reviewService.getReviewsByUser(this.userId)
      .subscribe(reviews => {
        this.reviews = reviews;
        // console.log(this.reviews);
      });
  }
}
