import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';

import { Reply } from '../models/reply';

@Component({
  selector: 'app-reply-detail',
  templateUrl: './reply-detail.component.html',
  styleUrls: ['./reply-detail.component.css']
})
export class ReplyDetailComponent implements OnInit {
  @Output() increaseReplyCtr: EventEmitter<any> = new EventEmitter();
  replies: Reply[] = [];
  topicId: string = "";
  userId: number = 0;

  replyForm = this.fb.group({
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private forumService: ForumService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.topicId = String(this.route.snapshot.paramMap.get('topicId'));
    this.getReplies();
    console.log(`will join forum ${this.topicId}`);
    this.forumService.joinForum(this.topicId);
    this.forumService.newReply
      .subscribe(replyObject => {
        console.log("replyObject from socket event:", replyObject);
        this.replies.push(replyObject);
        this.increaseReplyCtr.emit(null);
      });
  }

  getReplies(): void {
    console.log("inside getReplies");
    console.log("topicId:", this.topicId);

    this.forumService.getReplies(this.topicId)
      .subscribe(replies => {
        this.replies = replies;
        console.log("replies:", this.replies);
      });
  }

  onSubmit(): void {
    this.forumService.addReply(this.replyForm.value, this.topicId, this.userId)
      .subscribe(replyObject => {
        console.log("added reply!");
        console.log(replyObject);

        console.log("will send via socket!");
        this.forumService.sendReply(replyObject, this.topicId);
        
        this.replyForm.setValue({
          content: '',
        });
      });
  }
}
