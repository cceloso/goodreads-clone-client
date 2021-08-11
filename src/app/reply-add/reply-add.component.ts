import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';

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
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.forumService.newReply
      .subscribe(replyObject => {
        console.log("replyObject from socket event:", replyObject);
        this.replies.push(replyObject);
      });
  }
  
  onSubmit(): void {
    this.forumService.addReply(this.replyForm.value, this.topicId, this.userId)
      .subscribe(replyObject => {
        console.log("added reply!");
        console.log(replyObject);

        console.log("will send via socket!");
        // this.forumService.sendReply(replyObject);
        
        this.replyForm.setValue({
          content: '',
        });
      });
  }

}
