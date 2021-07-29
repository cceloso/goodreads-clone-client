import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/books';

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getComments(bookId: string, reviewId: string): Observable<Comment[]> {
    const newUrl = `${this.url}/${bookId}/reviews/${reviewId}/comments`;
    return this.http.get<Comment[]>(newUrl).pipe(
      catchError(this.handleError<Comment[]>(`getComments for bookId=${bookId} and reviewId=${reviewId}`))
    );
  }
}
