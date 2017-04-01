import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {secret} from '../assets/secret';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {LoginPage} from "../pages/login/login";
import {NavController} from "ionic-angular";

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  /**
   * Take credentials from input fields and makes API call to verify user authentication.
   * Returns type of Observable, which we await and subscribe to in login.ts.
   * @param credentials
   * @returns {Observable<R>}
   */
  public login(credentials)
  {
    let body = JSON.stringify({username: credentials.username, password: credentials.password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(secret.Uri + '/api/membership/authenticate', body, options)
      .map(
        response => // successful login
          console.log(response),
        err => // unsuccessful login
          console.log(err));
  }

}
