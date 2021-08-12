import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic } from '../models/topic';

import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-topics-by-user',
  templateUrl: './topics-by-user.component.html',
  styleUrls: ['./topics-by-user.component.css']
})
export class TopicsByUserComponent implements OnInit {
  userId: number = 0;
  topics: Topic[] = [];
  topicsToDisplay: Topic[] = [];
  topicsToDisplayCount: number = 10;
  lastTopicIndex: number = 10;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.getTopicsByUser();
  }

  getTopicsByUser(): void {
    this.forumService.getTopicsByUser(this.userId.toString())
      .subscribe(topics => {
        this.topics = topics;
        this.topicsToDisplay = this.topics.slice(0, this.topicsToDisplayCount);
        this.lastTopicIndex = this.topicsToDisplayCount;
      });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if(this.bottomReached()) {
      this.lastTopicIndex += this.topicsToDisplayCount;
      this.topicsToDisplay = this.topics.slice(0, this.lastTopicIndex);
    }
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
