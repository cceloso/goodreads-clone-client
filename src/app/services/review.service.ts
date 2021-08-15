import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      return of(result as T);
    };
  }

  getReviewByUserAndBook(userId: number, bookId: string): Observable<any> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews?userId=${userId}`;
    return this.http.get<any>(newUrl).pipe(
      catchError(this.handleError<any>(`getReviewByUserAndBook`))
    );
  }

  getReviews(bookId: string): Observable<Review[]> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews`;
    return this.http.get<Review[]>(newUrl).pipe(
      catchError(this.handleError<Review[]>(`getReviews for bookId=${bookId}`))
    );
  }

  getReviewsByUser(userId: string): Observable<Review[]> {
    const newUrl = `${this.apiUrl}/users/${userId}/reviews`;
    return this.http.get<Review[]>(newUrl).pipe(
      catchError(this.handleError<Review[]>(`getReviewsByUser for userId=${userId}`))
    );
  }

  addReview(bookId: string, review: any): Observable<any> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews`;
    return this.http.post<any>(newUrl, review).pipe(
      catchError(this.handleError<any>(`addReview`))
    );
  }
  
  deleteReview(bookId: string, reviewId: string, userId: number): Observable<any> {
    const newUrl = `${this.apiUrl}/books/${bookId}/reviews/${reviewId}?userId=${userId}`;
    return this.http.delete<any>(newUrl).pipe(
      catchError(this.handleError<any>(`deleteReview`))
    );
  }
}
