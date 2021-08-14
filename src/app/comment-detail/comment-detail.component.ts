import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../models/comment';
import { User } from '../models/user';

import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  @Input() inputParams?: any;
  bookId: string = "";
  reviewId: string = "";
  userId: number = 0;
  comment?: Comment;
  readMore: boolean = false;
  
  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.bookId = this.inputParams.bookId;
    this.reviewId = this.inputParams.reviewId;
    this.comment = this.inputParams.comment;
    this.userId = this.authService.getUserId();
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}