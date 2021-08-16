import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { SocketService } from '../services/socket.service';

import { Reply } from '../models/reply';

@Component({
  selector: 'app-reply-add',
  templateUrl: './reply-add.component.html',
  styleUrls: ['./reply-add.component.css']
})
export class ReplyAddComponent implements OnInit {
  @Input() topicId: string = "";
  // @Output() addReply: EventEmitter<any> = new EventEmitter();
  userId: number = 0;
  replies: Reply[] = [];

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
    this.socketService.newReply
      .subscribe(replyObject => {
        this.replies.push(replyObject);
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

}
