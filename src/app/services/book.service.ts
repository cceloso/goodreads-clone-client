import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from '../models/book';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  private url = 'http://localhost:3000/books';

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log("There's an error!");
      console.error(error); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  getBook(bookId: string): Observable<Book[]> {
    const newUrl = `${this.url}/${bookId}`;
    return this.http.get<Book[]>(newUrl).pipe(
      catchError(this.handleError<Book[]>(`getBook bookId=${bookId}`))
    );
  }

  getBooksByGenre(genreName: string): Observable<Book[]> {
    const newUrl = `${this.url}?genre=${genreName}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooksByGenre', []))
      );
  }

  getGenres(): Observable<Genre[]> {
    const newUrl = `${this.url}?genre=all`;
    return this.http.get<Genre[]>(newUrl)
      .pipe(
        catchError(this.handleError<Genre[]>('getGenres', []))
      );
  }

  addBook(book: any): Observable<any> {
    const newUrl = `${this.url}`;
    return this.http.post<any>(newUrl, book).pipe(
      catchError(this.handleError<any>(`addBook book`))
    );
  }
}
