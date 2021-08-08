import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Book } from '../models/book';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private url = 'http://localhost:3000/books';
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log("There's an error!");
      console.error(error.error.error.message); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // redirect to 404 page
      // this.router.navigate(['/']);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBook(bookId: string): Observable<Book> {
    const newUrl = `${this.url}/${bookId}`;
    return this.http.get<Book>(newUrl).pipe(
      catchError(this.handleError<Book>(`getBook bookId=${bookId}`))
    );
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  getBooksByAuthor(author: string): Observable<Book[]> {
    const newUrl = `${this.url}?author=${author}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooksByAuthor', []))
      );
  }

  getBooksByGenre(genreName: string): Observable<Book[]> {
    const newUrl = `${this.url}?genre=${genreName}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooksByGenre', []))
      );
  }

  searchBooks(searchParam: string): Observable<Book[]> {
    const newUrl = `${this.url}?search=${searchParam}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('searchBooks', []))
      );
  }

  getGenres(): Observable<Genre[]> {
    const newUrl = 'http://localhost:3000/genres';
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
