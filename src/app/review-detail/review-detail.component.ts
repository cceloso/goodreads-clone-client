import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Review } from '../models/review';

import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { SocketService } from '../services/socket.service';

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

  editReview: boolean = false;
  oldRatingValue: number = 0;
  oldReview: string = "";
  ratingValue: number = 0;

  reviewForm = this.fb.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private reviewService: ReviewService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookIdAndReview.bookId;
    this.review = this.bookIdAndReview.review;
    this.userId = this.authService.getUserId();

    if(this.review) {
      this.reviewId = this.review.id;
      this.posterId = this.review.userId;
      this.oldRatingValue = this.review.rating;
      this.oldReview = this.review.review;
      this.reviewForm.patchValue({
        review: this.oldReview
      });
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

  onClickEdit(): void {
    this.editReview = true;
    // if(this.review) {
    //   this.reviewId = this.review.id;
    //   this.posterId = this.review.userId;
    //   this.oldRatingValue = this.review.rating;
    //   this.oldReview = this.review.review;
    //   this.reviewForm.patchValue({
    //     review: this.oldReview
    //   });
    // }
    // console.log("review:", this.review);
  }

  onCancelEdit(): void {
    this.editReview = false;
    this.reviewForm.setValue({
      rating: this.oldRatingValue,
      review: this.oldReview
    });
  }

  updateReview(rating: number): void {
    this.ratingValue = rating;
    this.reviewForm.patchValue({
      rating: this.ratingValue,
    });
  }

  onClearRating(): void {
    this.ratingValue = 0;
    this.reviewForm.patchValue({
      rating: '',
    });
  }

  onEditReview(): void {
    this.reviewService.editReview(this.bookId, this.reviewId, this.userId, this.reviewForm.value)
    .subscribe(val => {
      // this.reviewForm.setValue({
      //   rating: '',
      //   review: ''
      // });
    });
  }

  onDeleteReview(): void {
    this.reviewService.deleteReview(this.bookId, this.reviewId, this.userId)
      .subscribe(val => {
        // window.location.reload();
      });
  }
}
