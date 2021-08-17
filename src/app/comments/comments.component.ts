import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../models/comment';

import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { SocketService } from '../services/socket.service';

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
  room: string = "";

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.bookId = this.bookAndReviewId.bookId;
    this.reviewId = this.bookAndReviewId.reviewId;
    this.userId = this.authService.getUserId();
    this.room = `${this.bookId}-${this.reviewId}`;

    // this.socketService.listenToUpdate("bookUpdate", `${this.bookId}-${this.reviewId}`);

    this.socketService.newComment
      .subscribe(reviewIdAndCommentObject => {
        if(reviewIdAndCommentObject.reviewId == this.reviewId) {
          this.comments.push(reviewIdAndCommentObject.commentObject);
        }
      });

    this.socketService.updatedComment
      .subscribe(reviewIdAndCommentObject => {
        if(reviewIdAndCommentObject.reviewId == this.reviewId) {
          this.comments[this.comments.findIndex(comment => comment.id == reviewIdAndCommentObject.commentObject.id)] = reviewIdAndCommentObject.commentObject;
        }
      });

    this.socketService.removedComment
      .subscribe(reviewIdAndCommentId => {
        if(reviewIdAndCommentId.reviewId == this.reviewId) {
          this.comments = this.comments.filter((comment) => comment.id != reviewIdAndCommentId.commentId);
        }
      });
  }

  onViewComments(): void {
    this.viewComments = !this.viewComments;
    this.getComments();
    this.socketService.listenToUpdate("bookUpdate", this.room);
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
