import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Topic } from '../models/topic';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/forums';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
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
