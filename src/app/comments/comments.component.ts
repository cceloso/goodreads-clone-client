import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() bookAndReviewId?: any;
  bookId: string = "";
  reviewId: string = "";
  comments: Comment[] = [];
  viewComments: boolean = false;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookAndReviewId.bookId;
    this.reviewId = this.bookAndReviewId.reviewId;
  }

  onViewComments(): void {
    this.viewComments = !this.viewComments;
    this.getComments();
  }

  getComments(): void {
    this.commentService.getComments(this.bookId, this.reviewId)
    .subscribe(comments => {
      this.comments = comments;
    });
  }
}
