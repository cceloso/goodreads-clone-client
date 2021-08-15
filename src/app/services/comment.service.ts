import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      return of(result as T);
    };
  }

  getComments(bookId: string, reviewId: string): Observable<Comment[]> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews/${reviewId}/comments`;
    return this.http.get<Comment[]>(newUrl).pipe(
      catchError(this.handleError<Comment[]>(`getComments for bookId=${bookId} and reviewId=${reviewId}`))
    );
  }

  addComment(bookId: string, reviewId: string, userId: number, comment: any): Observable<any> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews/${reviewId}/comments?userId=${userId}`;
    return this.http.post<any>(newUrl, comment).pipe(
      catchError(this.handleError<any>(`addComment`))
    );
  }

  deleteComment(bookId: string, reviewId: string, commentId: string, userId: number): Observable<any> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews/${reviewId}/comments/${commentId}?userId=${userId}`;
    return this.http.delete<any>(newUrl).pipe(
      catchError(this.handleError<any>(`deleteComment`))
    );
  }
}
