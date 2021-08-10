import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reply } from '../models/reply';

import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-reply-detail',
  templateUrl: './reply-detail.component.html',
  styleUrls: ['./reply-detail.component.css']
})
export class ReplyDetailComponent implements OnInit {
  replies: Reply[] = [];
  topicId: string = "";

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
  ) { }

  ngOnInit(): void {
    this.getReplies();
  }

  getReplies(): void {
    this.topicId = String(this.route.snapshot.paramMap.get('topicId'));

    console.log("inside getReplies");
    console.log("topicId:", this.topicId);

    this.forumService.getReplies(this.topicId)
      .subscribe(replies => {
        this.replies = replies;
        console.log("replies:", this.replies);
      });
  }
}
