import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {
  @Output() addReview: EventEmitter<any> = new EventEmitter();

  reviewForm = this.fb.group({
    rating: ['', Validators.required],
    review: ['', Validators.required]
  });

  ratingValue: number = 0;
  bookId: string = String(this.route.snapshot.paramMap.get('bookId'));
  userId: number = 0;
  userHasReview: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getReviewByUserAndBook();
  }

  getReviewByUserAndBook(): void {
    this.reviewService.getReviewByUserAndBook(this.userId, this.bookId)
      .subscribe(val => {
        this.userHasReview = val;
        console.log("userHasReview in review-add after calling service:", this.userHasReview);
      });
  }

  onSubmit(): void {
    this.userId = this.authService.getUserId();

    console.log(this.reviewForm.value);
    console.log(this.userId);

    this.reviewService.addReview(this.bookId, this.reviewForm.value)
      .subscribe(val => {
        this.reviewForm.setValue({
          rating: '',
          review: ''
        });
        this.userHasReview = true;
        this.addReview.emit(null);
        window.location.reload();
      });
  }

  updateReview(rating: number): void {
    this.ratingValue = rating;
    this.reviewForm.patchValue({
      rating: this.ratingValue,
    });
    console.log("changed rating to", this.ratingValue);
  }

  onClearRating(): void {
    this.ratingValue = 0;
    this.reviewForm.patchValue({
      rating: '',
    });
  }

  onClose(): void {
    this.onClearRating();
    this.reviewForm.patchValue({
      review: '',
    });
  }
}
