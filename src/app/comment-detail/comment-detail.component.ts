import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Comment } from '../models/comment';

import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  @Input() inputParams?: any;
  bookId: string = "";
  reviewId: string = "";
  commentId: string = "";
  userId: number = 0;
  posterId: number = -1;
  comment?: Comment;
  readMore: boolean = false;

  editComment: boolean = false;
  oldComment: string = "";

  commentForm = this.fb.group({
    comment: ['', Validators.required],
  });
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private commentService: CommentService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.bookId = this.inputParams.bookId;
    this.reviewId = this.inputParams.reviewId;
    this.comment = this.inputParams.comment;
    this.userId = this.authService.getUserId();

    if(this.comment) {
      this.commentId = this.comment.id;
      this.posterId = this.comment.userId;
      this.oldComment = this.comment.comment;
      this.commentForm.setValue({
        comment: this.oldComment,
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
    this.editComment = true;
  }

  onCancelEdit(): void {
    this.editComment = false;
    this.commentForm.setValue({
      comment: this.oldComment,
    });
  }

  onEditComment(): void {
    this.commentService.editComment(this.bookId, this.reviewId, this.commentId, this.userId, this.commentForm.value)
      .subscribe(val => {
        // console.log("edited reply");
        // console.log("replyObject:", replyObject);
        // console.log("val:", val);
      });
  }

  onDeleteComment(): void {
    this.commentService.deleteComment(this.bookId, this.reviewId, this.commentId, this.userId)
      .subscribe(val => {
        // console.log("deleted comment");
        // console.log("val:", val);
        // window.location.reload();
      });
  }
}
