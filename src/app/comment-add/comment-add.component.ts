import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {
  @Input() bookAndReviewId?: any;
  @Output() addComment: EventEmitter<any> = new EventEmitter();
  bookId: string = "";
  reviewId: string = "";
  userId: string = "1";

  commentForm = this.fb.group({
    comment: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookAndReviewId.bookId;
    this.reviewId = this.bookAndReviewId.reviewId;
  }

  onSubmit(): void {
    // console.log(`bookId: ${this.bookId}`);
    // console.log(`reviewId: ${this.reviewId}`);
    // console.log(`userId: ${this.userId}`);
    // console.log(this.commentForm.value);

    this.commentService.addComment(this.bookId, this.reviewId, this.userId, this.commentForm.value)
      .subscribe(val => {
        // console.log("added comment!");
        // console.log(val);
        this.commentForm.setValue({
          comment: '',
        });
        this.addComment.emit(null);
      });
  }
}
