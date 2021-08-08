import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/users';

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error.error.error); // log to console instead
      const errorMessage = error.error.error.message;
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(errorMessage as T);
    };
  }

  getUsers(): Observable<User[]> {
    const newUrl = `${this.url}`;
    return this.http.get<User[]>(newUrl).pipe(
      catchError(this.handleError<User[]>(`getUsers`))
    );
  }

  getUser(userId: string): Observable<User[]> {
    const newUrl = `${this.url}/${userId}`;
    return this.http.get<User[]>(newUrl).pipe(
      catchError(this.handleError<User[]>(`getUser for userId=${userId}`))
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.url, user).pipe(
      catchError(this.handleError<any>(`addUser`))
    );
  }
  
  // loginUser(user: any): Observable<any> {
  //   return this.http.post<any>(this.url, user).pipe(
  //     catchError(this.handleError<any>(`loginUser`))
  //   );
  // }

  loginUser(user: any): Observable<any> {
    const newUrl = "http://localhost:3000/users/login";
    return this.http.post<any>(newUrl, user).pipe(
      catchError(this.handleError<any>(`loginUser`))
    );
  }

  signupUser(user: any): Observable<any> {
    const newUrl = "http://localhost:3000/users";
    return this.http.post<any>(newUrl, user).pipe(
      catchError(this.handleError<any>(`signupUser`))
    );
  }

  getProtected(): Observable<any> {
    const newUrl = "http://localhost:3000/protected";
    // return this.http.get<any>(newUrl).pipe(
    //   catchError(this.handleError<any>(`signupUser`))
    // );
    return this.http.get<any>(newUrl);
  }  
}
