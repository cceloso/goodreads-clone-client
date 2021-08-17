import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { SocketService } from '../services/socket.service';

import { Reply } from '../models/reply';

@Component({
  selector: 'app-reply-detail',
  templateUrl: './reply-detail.component.html',
  styleUrls: ['./reply-detail.component.css']
})
export class ReplyDetailComponent implements OnInit {
  @Input() inputParams: any;

  reply?: Reply;
  topicId: string = "";
  replyId: string= "";
  userId: number = 0;
  posterId: number = -1;
  readMore: boolean = false;
  
  editReply: boolean = false;
  oldReply: string = "";

  replyForm = this.fb.group({
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.topicId = this.inputParams.topicId;
    this.reply = this.inputParams.reply;

    if(this.reply) {
      this.replyId = this.reply.id;
      this.posterId = this.reply.userId;
      this.oldReply = this.reply.content;
      this.replyForm.setValue({
        content: this.oldReply,
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
    this.editReply = true;
  }

  onCancelEdit(): void {
    this.editReply = false;
    this.replyForm.setValue({
      content: this.oldReply,
    });
  }

  onEditReply(): void {
    this.forumService.editReply(this.replyForm.value, this.topicId, this.replyId, this.userId)
      .subscribe(replyObject => {
        // console.log("edited reply");
        // console.log("replyObject:", replyObject);
      });
  }

  onDeleteReply(): void {
    this.forumService.deleteReply(this.topicId, this.replyId, this.userId)
      .subscribe(val => {
        // console.log("deleted reply");
        // console.log("val:", val);
      });
  }
}
