import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-reply-add',
  templateUrl: './reply-add.component.html',
  styleUrls: ['./reply-add.component.css']
})
export class ReplyAddComponent implements OnInit {
  @Input() topicId: string = "";
  // @Output() addReply: EventEmitter<any> = new EventEmitter();
  userId: number = 0;

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
  }
  
  onSubmit(): void {
    this.forumService.addReply(this.replyForm.value, this.topicId, this.userId)
      .subscribe(val => {
        console.log("added reply!");
        console.log(val);
        this.replyForm.setValue({
          content: '',
        });
        // this.addComment.emit(null);
      });
  }

}
