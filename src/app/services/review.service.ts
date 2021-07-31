import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  private booksUrl = 'http://localhost:3000/books';
  private usersUrl = 'http://localhost:3000/users';

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

  getReviews(bookId: string): Observable<Review[]> {
    const newUrl = `${this.booksUrl}/${bookId}/reviews`;
    return this.http.get<Review[]>(newUrl).pipe(
      catchError(this.handleError<Review[]>(`getReviews for bookId=${bookId}`))
    );
  }

  getReviewsByUser(userId: string): Observable<Review[]> {
    const newUrl = `${this.usersUrl}/${userId}/reviews`;
    return this.http.get<Review[]>(newUrl).pipe(
      catchError(this.handleError<Review[]>(`getReviewsByUser for userId=${userId}`))
    );
  }

  addReview(bookId: string, userId: string, review: any): Observable<any> {
    const newUrl = `${this.booksUrl}/${bookId}/reviews?userId=${userId}`;
    return this.http.post<any>(newUrl, review).pipe(
      catchError(this.handleError<any>(`addReview`))
    );
  }
}
