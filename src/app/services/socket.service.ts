import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { Topic } from '../models/topic';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  newUserState = this.socket.fromEvent<any>("newUserState");

  newReview = this.socket.fromEvent<any>("newReview");
  updatedReview = this.socket.fromEvent<any>("updatedReview");
  removedReview = this.socket.fromEvent<any>("removedReview");

  newComment = this.socket.fromEvent<any>("newComment");
  updatedComment = this.socket.fromEvent<any>("updatedComment");
  removedComment = this.socket.fromEvent<any>("removedComment");

  newTopic = this.socket.fromEvent<Topic>("newTopic");
  updatedTopic = this.socket.fromEvent<any>("updatedTopic");
  removedTopic = this.socket.fromEvent<any>("removedTopic");

  newReply = this.socket.fromEvent<Reply>("newReply");
  updatedReply = this.socket.fromEvent<any>("updatedReply");
  removedReply = this.socket.fromEvent<any>("removedReply");

  listenToUpdate(eventName: string, topicId: string) {
    this.socket.emit("listenToUpdate", eventName, topicId);
  }

  stopListeningToUpdate(eventName: string, topicId: string) {
    this.socket.emit("stopListeningToUpdate", eventName, topicId);
  }

  updateNavbar() {
    this.socket.emit("updateNavbar");
  }
}
