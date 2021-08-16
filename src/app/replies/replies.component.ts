import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { SocketService } from '../services/socket.service';

import { Reply } from '../models/reply';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit, OnDestroy {
  @Output() increaseReplyCtr: EventEmitter<any> = new EventEmitter();
  @Output() decreaseReplyCtr: EventEmitter<any> = new EventEmitter();
  replies: Reply[] = [];
  topicId: string = "";
  userId: number = 0;
  readMore: boolean = false;

  replyForm = this.fb.group({
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private forumService: ForumService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.topicId = String(this.route.snapshot.paramMap.get('topicId'));
    this.getReplies();
    this.socketService.listenToUpdate("topicUpdate", this.topicId);
    this.socketService.newReply
      .subscribe(replyObject => {
        this.replies.push(replyObject);
        this.increaseReplyCtr.emit(null);
      });

    this.socketService.updatedReply
      .subscribe(replyObject => {
        this.replies[this.replies.findIndex(reply => reply.id == replyObject.id)] = replyObject;
      });
    
    this.socketService.removedReply
      .subscribe(removedReplyId => {
        this.replies = this.replies.filter((reply) => reply.id != removedReplyId);
        this.decreaseReplyCtr.emit(null);
      });
  }

  ngOnDestroy(): void {
    this.socketService.stopListeningToUpdate("topicUpdate", this.topicId);
  }

  getReplies(): void {
    this.forumService.getReplies(this.topicId)
      .subscribe(replies => {
        this.replies = replies;
      });
  }

  onSubmit(): void {
    this.forumService.addReply(this.replyForm.value, this.topicId, this.userId)
      .subscribe(replyObject => {
        this.replyForm.setValue({
          content: '',
        });
      });
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }
}
