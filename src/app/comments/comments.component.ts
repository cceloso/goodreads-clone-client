import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../models/comment';
import { User } from '../models/user';

import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
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
  userId: number = 0;
  comments: Comment[] = [];
  viewComments: boolean = false;
  readMore: boolean = false;

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookAndReviewId.bookId;
    this.reviewId = this.bookAndReviewId.reviewId;
    this.userId = this.authService.getUserId();
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

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}
