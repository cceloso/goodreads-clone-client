import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  userId: string = "1";

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.reviewForm.value);

    this.reviewService.addReview(this.bookId, this.userId, this.reviewForm.value)
      .subscribe(val => {
        // console.log("added review!");
        // console.log(val);
        this.reviewForm.setValue({
          rating: '',
          review: ''
        });
        this.addReview.emit(null);
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
}
