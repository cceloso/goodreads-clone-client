import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      let expiresAt = "";
      if(expiration) {
        expiresAt = JSON.parse(expiration);
      }

      return moment(expiresAt);
  }

}
