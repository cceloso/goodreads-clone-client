import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { Topic } from '../models/topic';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  newTopic = this.socket.fromEvent<Topic>("newTopic");
  newReply = this.socket.fromEvent<Reply>("newReply");

  joinForum(topicId: string) {
    console.log("inside joinForum service");
    this.socket.emit("joinForum", topicId);
  }

  sendTopic(topicObject: Topic) {
    console.log("inside addTopic service");
    this.socket.emit("sendTopic", topicObject);
  }

  sendReply(replyObject: Reply, topicId: string) {
    console.log("inside sendReply service");
    this.socket.emit("sendReply", replyObject, topicId);
  }

  private url = 'http://localhost:3000/forums';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  
  getTopic(topicId: string): Observable<Topic[]> {
    const newUrl = `${this.url}/${topicId}`;
    return this.http.get<Topic[]>(newUrl).pipe(
      catchError(this.handleError<Topic[]>(`getTopic`))
    );
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.url).pipe(
      catchError(this.handleError<Topic[]>(`getTopics`))
    );
  }

  searchBooks(searchParam: string): Observable<Topic[]> {
    const newUrl = `${this.url}?search=${searchParam}`;
    return this.http.get<Topic[]>(newUrl)
      .pipe(
        catchError(this.handleError<Topic[]>('searchTopics', []))
      );
  }

  addTopic(topic: any, userId: number): Observable<any> {
    const newUrl = `${this.url}?userId=${userId}`;
    return this.http.post<any>(newUrl, topic).pipe(
      catchError(this.handleError<any>(`addTopic`))
    );
  }

  getReplies(topicId: string): Observable<Reply[]> {
    const newUrl = `${this.url}/${topicId}/replies`;
    return this.http.get<Reply[]>(newUrl).pipe(
      catchError(this.handleError<Reply[]>(`getReplies`))
    );
  }

  addReply(content: any, topicId: string, userId: number): Observable<any> {
    const newUrl = `${this.url}/${topicId}/replies?userId=${userId}`;
    return this.http.post<any>(newUrl, content).pipe(
      catchError(this.handleError<any>(`addReply`))
    );
  }
}
