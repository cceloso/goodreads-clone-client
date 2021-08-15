import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../models/review';

import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  // @Input() review?: Review;
  @Input() bookIdAndReview?: any;
  bookId: string = "";
  reviewId: string = "";
  userId: number = 0;
  posterId: number = -1;
  review?: Review;
  readMore: boolean = false;
  
  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookIdAndReview.bookId;
    this.review = this.bookIdAndReview.review;
    this.userId = this.authService.getUserId();

    if(this.review) {
      this.reviewId = this.review.id;
      this.posterId = this.review.userId;
    }
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }

  convertDate(dateTime: string) {
    let t = dateTime.split('-').join(',');
    t = t.split('T').join(',');
    t = t.split(':').join(',');
    t = t.split('Z').join(',');
    let splittedArr = t.split(',');

    const datePosted = new Date(Date.UTC(Number(splittedArr[0]), Number(splittedArr[1]) - 1, Number(splittedArr[2]), Number(splittedArr[3]), Number(splittedArr[4]), Number(splittedArr[5])));

    const datePostedStr = datePosted.toLocaleString();

    return datePostedStr;
  }

  onDeleteReview(): void {
    console.log("clicked on delete review");
    console.log("reviewId:", this.reviewId);
    this.reviewService.deleteReview(this.bookId, this.reviewId, this.userId)
      .subscribe(val => {
        console.log("val:", val);
        console.log("deleted review");
        window.location.reload();
      });
  }
}
