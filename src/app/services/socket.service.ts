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

  newTopic = this.socket.fromEvent<Topic>("newTopic");
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
