import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic } from '../models/topic';

import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  topic?: Topic;
  topicId: string = "";
  viewReplies: boolean = false;
  replyCtr: number = 0;
  readMore: boolean = false;
  displayNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
  ) { }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic(): void {
    this.topicId = String(this.route.snapshot.paramMap.get('topicId'));

    this.forumService.getTopic(this.topicId)
      .subscribe(topic => {
        console.log("topic:", topic);
        if(topic == undefined) {
          this.displayNotFound = true;
        } else {
          this.topic = topic[0];
          this.replyCtr = this.topic.replyCtr;
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
    console.log("View replies in topic-detail:", this.viewReplies);
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
}
