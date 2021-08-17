import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Topic } from '../models/topic';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic?: Topic;
  topicId: string = "";
  userId: number = 0;
  posterId: number = -1;
  viewReplies: boolean = false;
  replyCtr: number = 0;
  readMore: boolean = false;
  displayNotFound: boolean = false;

  editTopic: boolean = false;
  oldTitle: string = "";
  oldContent: string = "";
  oldFlair: string = "";
  oldFlairIndex: number = 0;

  flairs: string[] = ['General Question/Information', 'Discussion', 'Recommendations', 'Others'];

  topicForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    flair: [this.flairs[0], Validators.required]
  });

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
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private forumService: ForumService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getTopic();

    this.socketService.updatedTopic
      .subscribe(topicObject => {
        if(topicObject != undefined) {
          this.topic = topicObject;
          this.initValues(topicObject);
        }
      });
    
    this.socketService.removedTopic
      .subscribe(removedTopicId => {
        if(this.topicId == removedTopicId) {
          this.displayNotFound = true;
          this.router.navigate(['/forums']);
        }
      });
  }

  initValues(topic: Topic): void {
    this.replyCtr = topic.replyCtr;
    this.posterId = topic.userId;
    this.oldTitle = topic.title;
    this.oldContent = topic.content;
    this.oldFlair = topic.flair;
    this.oldFlairIndex = this.flairs.indexOf(this.oldFlair);
    this.topicForm.setValue({
      title: this.oldTitle,
      content: this.oldContent,
      flair: this.flairs[this.oldFlairIndex],
    });
  }

  getTopic(): void {
    this.topicId = String(this.route.snapshot.paramMap.get('topicId'));

    this.forumService.getTopic(this.topicId)
      .subscribe(topic => {
        if(topic == undefined) {
          this.displayNotFound = true;
        } else {
          this.topic = topic[0];
          this.initValues(this.topic);
        }
      });
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

  onClickViewReplies() {
    this.viewReplies = !this.viewReplies;
  }

  increaseReplyCtr() {
    this.replyCtr += 1;
  }
  
  decreaseReplyCtr() {
    this.replyCtr -= 1;
  }

  onClickReadMore(): void {
    this.readMore = !this.readMore;
  }

  onClickEdit(): void {
    this.editTopic = true;
  }

  onCancelEdit(): void {
    this.editTopic = false;
    this.topicForm.setValue({
      title: this.oldTitle,
      content: this.oldContent,
      flair: this.flairs[this.oldFlairIndex],
    });
  }

  onEditTopic(): void {
    this.forumService.editTopic(this.topicForm.value, this.topicId, this.userId)
    .subscribe(topicObject => {
      this.topicForm.setValue({
        title: '',
        content: '',
        flair: this.flairs[0],
      });
    });
  }

  onDeleteTopic(): void {
    this.forumService.deleteTopic(this.topicId, this.userId)
      .subscribe(val => {
        // console.log("deleted reply");
        // console.log("val:", val);
      });
  }
}
