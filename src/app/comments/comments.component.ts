import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
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
  bookId: string = "";
  @Input() reviewId: string = "";
  comments: Comment[] = [];
  viewComments: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.bookId = String(this.route.snapshot.queryParams.bookId);
  }

  onViewComments(): void {
    this.viewComments = !this.viewComments;
    this.commentService.getComments(this.bookId, this.reviewId)
    .subscribe(comments => {
      this.comments = comments;
      console.log("comments:")
      console.log(this.comments);
    });
  }
}
