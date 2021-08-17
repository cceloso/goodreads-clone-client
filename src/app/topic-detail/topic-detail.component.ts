import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  oldTopic: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private forumService: ForumService,
    private socketService: SocketService,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.getTopic();

    this.socketService.removedTopic
      .subscribe(removedTopicId => {
        if(this.topicId == removedTopicId) {
          this.displayNotFound = true;
          this.router.navigate(['/forums']);
        }
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
          this.replyCtr = this.topic.replyCtr;
          this.posterId = this.topic.userId;
          this.oldTopic = this.topic.content;
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
    // this.replyForm.setValue({
    //   content: this.oldReply,
    // });
  }

  onEditTopic(): void {
    // this.forumService.editReply(this.replyForm.value, this.topicId, this.replyId, this.userId)
    //   .subscribe(replyObject => {
    //     // console.log("edited reply");
    //     // console.log("replyObject:", replyObject);
    //   });
  }

  onDeleteTopic(): void {
    this.forumService.deleteTopic(this.topicId, this.userId)
      .subscribe(val => {
        console.log("deleted reply");
        console.log("val:", val);
      });
  }
}
