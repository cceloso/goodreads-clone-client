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
}
