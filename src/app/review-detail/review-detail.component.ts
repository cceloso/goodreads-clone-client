import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../models/review';
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
  review?: Review;
  readMore: boolean = false;
  
  constructor(
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookIdAndReview.bookId;
    this.review = this.bookIdAndReview.review;
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}
