import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Review } from '../models/review';

import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Output() increaseRatingCtr: EventEmitter<any> = new EventEmitter();
  @Output() decreaseRatingCtr: EventEmitter<any> = new EventEmitter();
  @Output() updateAverageRating: EventEmitter<any> = new EventEmitter();
  @Input() bookId: string = "";  
  userId: number = 0;
  reviews: Review[] = [];
  readMore: boolean = false;
  userHasReview: boolean = false;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.getReviews();
    this.userId = this.authService.getUserId();
    this.getReviewByUserAndBook();

    this.socketService.listenToUpdate("bookUpdate", this.bookId);

    this.socketService.newReview
      .subscribe(reviewAndAverageRating => {
        this.reviews.unshift(reviewAndAverageRating.reviewObject);
        this.increaseRatingCtr.emit(null);
        this.updateAverageRating.emit(reviewAndAverageRating.averageRating);
      });

    this.socketService.updatedReview
      .subscribe(reviewAndAverageRating => {
        this.reviews[this.reviews.findIndex(review => review.id == reviewAndAverageRating.reviewObject.id)] = reviewAndAverageRating.reviewObject;
        this.updateAverageRating.emit(reviewAndAverageRating.averageRating);
      });

    this.socketService.removedReview
      .subscribe(reviewIdAndUserIdAndAverageRating => {
        this.reviews = this.reviews.filter((review) => review.id != reviewIdAndUserIdAndAverageRating.reviewId);
        this.decreaseRatingCtr.emit(null);
        this.updateAverageRating.emit(reviewIdAndUserIdAndAverageRating.averageRating);
      });
  }

  getReviewByUserAndBook(): void {
    this.reviewService.getReviewByUserAndBook(this.userId, this.bookId)
      .subscribe(val => {
        this.userHasReview = val;
      });
  }

  getReviews(): void {
    this.reviewService.getReviews(this.bookId)
      .subscribe(reviews => {
        this.reviews = reviews;
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}
