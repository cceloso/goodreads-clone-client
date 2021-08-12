import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { Topic } from '../models/topic';

import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  topics: Topic[] = [];
  userId: number = 0;
  searchParam: string = "";
  selectedFlair: string = "All";

  topicsToDisplay: Topic[] = [];
  topicsToDisplayCount: number = 5;
  lastTopicIndex: number = 5;

  searchForm = this.fb.group({
    searchParam: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private forumService: ForumService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.queryParams
    .subscribe(queryParams => {
      this.searchParam = String(this.route.snapshot.queryParams.q);
      if(this.searchParam != "undefined") {
        this.searchTopics(this.searchParam);
      } else {
        this.getTopics();
      }
    })
    this.forumService.newTopic
      .subscribe(topicObject => {
        console.log("topicObject from socket event:", topicObject);
        
        if(this.selectedFlair == topicObject.flair || this.selectedFlair == "All") {
          this.topics.unshift(topicObject);
          this.topicsToDisplay = this.topics.slice(0, this.lastTopicIndex);
        }
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

  getTopics(): void {
    this.forumService.getTopics()
      .subscribe(topics => {
        this.topics = topics;
        this.topicsToDisplay = this.topics.slice(0, this.topicsToDisplayCount);
        this.lastTopicIndex = this.topicsToDisplayCount;
      });
  }

  getTopicsByFlair(flair: string): void {
    if(flair == "All") {
      this.getTopics();
    } else {
      this.forumService.getTopicsByFlair(flair)
        .subscribe(topics => {
          this.topics = topics;
          this.topicsToDisplay = this.topics.slice(0, this.topicsToDisplayCount);
          this.lastTopicIndex = this.topicsToDisplayCount;
        });
    }
  }

  searchTopics(searchParam: string): void {
    this.forumService.searchTopics(searchParam)
      .subscribe(topics => {
        this.topics = topics;
        this.topicsToDisplay = this.topics.slice(0, this.topicsToDisplayCount);
        this.lastTopicIndex = this.topicsToDisplayCount;
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

  onSubmit(): void {
    const searchParam = this.searchForm.value.searchParam;
    console.log(this.searchForm.value);
    console.log(searchParam);

    this.searchForm.setValue({
      searchParam: ''
    });

    this.router.navigate(['/forums'], { queryParams: { q: searchParam} });
  }

  onClickFlair(flair: string): void {
    this.selectedFlair = flair;
    this.getTopicsByFlair(flair);
  }
}
