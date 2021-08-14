import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

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
  
  private apiUrl = environment.apiUrl;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  
  getTopic(topicId: string): Observable<Topic[]> {
    const newUrl = `${this.apiUrl}/forums/${topicId}`;
    return this.http.get<Topic[]>(newUrl).pipe(
      catchError(this.handleError<Topic[]>(`getTopic`))
    );
  }

  getTopics(): Observable<Topic[]> {
    const newUrl = `${this.apiUrl}/forums`;
    return this.http.get<Topic[]>(newUrl).pipe(
      catchError(this.handleError<Topic[]>(`getTopics`))
    );
  }

  getTopicsByFlair(flair: string): Observable<Topic[]> {
    const newUrl = `${this.apiUrl}/forums?flair=${flair}`;
    return this.http.get<Topic[]>(newUrl).pipe(
      catchError(this.handleError<Topic[]>(`getTopicsByFlair`))
    );
  }

  getTopicsByUser(userId: string): Observable<Topic[]> {
    const newUrl = `${this.apiUrl}/forums?userId=${userId}`;
    return this.http.get<Topic[]>(newUrl).pipe(
      catchError(this.handleError<Topic[]>(`getTopicsByUser`))
    );
  }

  searchTopics(searchParam: string): Observable<Topic[]> {
    const newUrl = `${this.apiUrl}/forums?q=${searchParam}`;
    return this.http.get<Topic[]>(newUrl)
      .pipe(
        catchError(this.handleError<Topic[]>('searchTopics', []))
      );
  }

  addTopic(topic: any, userId: number): Observable<any> {
    const newUrl = `${this.apiUrl}/forums?userId=${userId}`;
    return this.http.post<any>(newUrl, topic).pipe(
      catchError(this.handleError<any>(`addTopic`))
    );
  }

  getReplies(topicId: string): Observable<Reply[]> {
    const newUrl = `${this.apiUrl}/forums/${topicId}/replies`;
    return this.http.get<Reply[]>(newUrl).pipe(
      catchError(this.handleError<Reply[]>(`getReplies`))
    );
  }

  addReply(content: any, topicId: string, userId: number): Observable<any> {
    const newUrl = `${this.apiUrl}/forums/${topicId}/replies?userId=${userId}`;
    return this.http.post<any>(newUrl, content).pipe(
      catchError(this.handleError<any>(`addReply`))
    );
  }
}
