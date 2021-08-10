import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Topic } from '../models/topic';

import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  topics: Topic[] = [];

  searchForm = this.fb.group({
    searchParam: ['', Validators.required]
  });

  constructor(
    private forumService: ForumService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    this.forumService.getTopics()
      .subscribe(topics => {
        this.topics = topics;
        // console.log(this.topics);
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
}
