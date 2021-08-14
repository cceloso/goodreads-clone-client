import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) { }

  newUserState = this.socket.fromEvent<any>("newUserState");

  updateNavbar() {
    console.log("inside updateNavbar service");
    this.socket.emit("updateNavbar");
  }

  private apiUrl = environment.apiUrl;
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.error.error); // log to console instead
      const errorMessage = error.error.error.message;

      return of(errorMessage as T);
    };
  }

  getUsers(): Observable<User[]> {
    const newUrl = `${this.apiUrl}/users`;
    return this.http.get<User[]>(newUrl).pipe(
      catchError(this.handleError<User[]>(`getUsers`))
    );
  }

  getUser(userId: number): Observable<User[]> {
    const newUrl = `${this.apiUrl}/users/${userId}`;
    return this.http.get<User[]>(newUrl).pipe(
      catchError(this.handleError<User[]>(`getUser for userId=${userId}`))
    );
  }

  addUser(user: any): Observable<any> {
    const newUrl = `${this.apiUrl}/users`;
    return this.http.post<any>(newUrl, user).pipe(
      catchError(this.handleError<any>(`addUser`))
    );
  }

  loginUser(user: any): Observable<any> {
    const newUrl = `${this.apiUrl}/users/login`;
    return this.http.post<any>(newUrl, user).pipe(
      catchError(this.handleError<any>(`loginUser`))
    );
  }

  signupUser(user: any): Observable<any> {
    const newUrl = `${this.apiUrl}/users`;
    return this.http.post<any>(newUrl, user).pipe(
      catchError(this.handleError<any>(`signupUser`))
    );
  }

  getProtected(): Observable<any> {
    const newUrl = `${this.apiUrl}/protected`;
    return this.http.get<any>(newUrl);
  }  
}
