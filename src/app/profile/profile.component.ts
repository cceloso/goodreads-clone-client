import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Review } from '../models/review';

import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = 0;
  userInfo?: any;
  reviews: Review[] = [];
  readMore: boolean = false;
  reviewsToDisplay: Review[] = [];
  reviewsToDisplayCount: number = 6;
  lastReviewIndex: number = 6;

  displayReviews: boolean = true;
  
  displayNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // this.userId = this.authService.getUserId();
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getUser();
    this.getReviewsByUser();
  }

  getUser(): void {
    this.userService.getUser(this.userId)
      .subscribe(val => {
        console.log("user gotten:", val);
        if(typeof val == "string") {
          this.displayNotFound = true;
        } else {
          this.userInfo = val;
        }
      });
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

  onClickDisplayNav(displayReviews: boolean) {
    this.displayReviews = displayReviews;
  }
}
