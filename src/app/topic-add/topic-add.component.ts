import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {
  flairs: string[] = ['General Question/Information', 'Discussion', 'Recommendations', 'Others'];

  topicForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    flair: [this.flairs[0], Validators.required]
  });

  userId: number = 0;

  get flair() {
    return this.topicForm.get('flair');
  }

  changeFlair(e: any) {
    if(this.flair) {
      this.flair.setValue(e.target.value, {
        onlySelf: true
      })
    }
  }
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }

  onSubmit(): void {
    this.forumService.addTopic(this.topicForm.value, this.userId)
    .subscribe(topicObject => {
      this.topicForm.setValue({
        title: '',
        content: '',
        flair: this.flairs[0],
      });
    });
  }

  onClose(): void {
    // console.log("clicked close");
  }

}
