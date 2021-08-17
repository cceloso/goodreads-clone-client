import { Component, OnInit, Input } from '@angular/core';

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
      .subscribe(reviewObject => {
        this.reviews.push(reviewObject);
      });

    this.socketService.updatedReview
      .subscribe(reviewObject => {
        this.reviews[this.reviews.findIndex(review => review.id == reviewObject.id)] = reviewObject;
      });

    this.socketService.removedReview
      .subscribe(reviewIdAndUserId => {
        this.reviews = this.reviews.filter((review) => review.id != reviewIdAndUserId.reviewId);
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
