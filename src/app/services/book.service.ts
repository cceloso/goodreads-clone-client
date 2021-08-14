import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  private apiUrl = environment.apiUrl;
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("There's an error!");
      console.error(error.error.error.message); // log to console instead

      return of(result as T);
    };
  }

  getBook(bookId: string): Observable<Book> {
    const newUrl = `${this.apiUrl}/books/${bookId}`;
    return this.http.get<Book>(newUrl).pipe(
      catchError(this.handleError<Book>(`getBook bookId=${bookId}`))
    );
  }

  getBooks(): Observable<Book[]> {
    const newUrl = `${this.apiUrl}/books`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  getBooksByAuthor(author: string): Observable<Book[]> {
    const newUrl = `${this.apiUrl}/books?author=${author}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooksByAuthor', []))
      );
  }

  getBooksByGenre(genreName: string): Observable<Book[]> {
    const newUrl = `${this.apiUrl}/books?genre=${genreName}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooksByGenre', []))
      );
  }

  searchBooks(searchParam: string): Observable<Book[]> {
    const newUrl = `${this.apiUrl}/books?search=${searchParam}`;
    return this.http.get<Book[]>(newUrl)
      .pipe(
        catchError(this.handleError<Book[]>('searchBooks', []))
      );
  }

  getGenres(): Observable<Genre[]> {
    const newUrl = `${this.apiUrl}/genres`;
    return this.http.get<Genre[]>(newUrl)
      .pipe(
        catchError(this.handleError<Genre[]>('getGenres', []))
      );
  }

  addBook(book: any): Observable<any> {
    const newUrl = `${this.apiUrl}/books`;
    return this.http.post<any>(newUrl, book).pipe(
      catchError(this.handleError<any>(`addBook book`))
    );
  }
}
