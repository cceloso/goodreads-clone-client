import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as moment from "moment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  @Output() getIsUserLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setLocalStorage(responseObj: any) {
    const expiresAt = moment().add(responseObj.expiresIn);
    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    const token = localStorage.getItem("id_token") || "";
    
    if(token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      if(isExpired) {
        return of(false);
        // return this.getIsUserLoggedIn.emit(false);
        // return false;
      }

      return of(true);
      // return this.getIsUserLoggedIn.emit(true);
      // return true;
    }

    return of(false);
    // return this.getIsUserLoggedIn.emit(false);
    // return false;
  }

  public isAuthenticated() {
    const token = localStorage.getItem("id_token") || "";
    
    if(token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      if(isExpired) {
        return false;
      }

      return true;
    }

    return false;
  }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      let expiresAt = "";
      if(expiration) {
        expiresAt = JSON.parse(expiration);
        console.log("expiresAt:", expiresAt);
      }

      return moment(expiresAt);
  }

  getUserId() {
    console.log("inside getUserId in auth service");
    
    const token = localStorage.getItem("id_token") || "";
    console.log("token:", token);
    let userId = 0;

    if(token) {
      const decoded: any = jwt_decode(token);

      if(decoded) {
        userId = decoded.sub;
      }
    }
    
    console.log("userId:", userId);
    return userId;
  }
}
