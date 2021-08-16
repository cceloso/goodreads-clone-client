import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Review } from '../models/review';

import { ReviewService } from '../services/review.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviews-by-user',
  templateUrl: './reviews-by-user.component.html',
  styleUrls: ['./reviews-by-user.component.css']
})
export class ReviewsByUserComponent implements OnInit {
  reviews: Review[] = [];
  userId: number = 0;

  readMore: boolean = false;
  reviewsToDisplay: Review[] = [];
  reviewsToDisplayCount: number = 6;
  lastReviewIndex: number = 6;

  apiUrl: string = environment.apiUrl;
  startingUrl: string = `${this.apiUrl}/public/images/books`;
  
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getReviewsByUser();
  }

  getReviewsByUser(): void {
    this.reviewService.getReviewsByUser(this.userId.toString())
      .subscribe(reviews => {
        this.reviews = reviews;
        this.reviewsToDisplay = this.reviews.slice(0, this.reviewsToDisplayCount);
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if(this.bottomReached()) {
      this.lastReviewIndex += this.reviewsToDisplayCount;
      this.reviewsToDisplay = this.reviews.slice(0, this.lastReviewIndex);
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
