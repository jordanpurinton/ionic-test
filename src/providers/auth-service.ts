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

  jwtHelper: JwtHelper = new JwtHelper();
  user: string;
  error: string;
  hasNoEvent: boolean = false;

  constructor(private http: Http) {
    let token = localStorage.getItem('id_token');
    if (token) {
      this.user = this.jwtHelper.decodeToken(token).username;
    }
  }

  public authenticated() {
    return tokenNotExpired();
  }

  public login(credentials) {
    let body = JSON.stringify({username: credentials.username, password: credentials.password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});

      return this.http.post(secret.Uri + '/api/membership/authenticate', body, options)
        .map
        ((response: Response) =>
            response.statusText,
          err =>
            this.hasNoEvent = true);
  }

  authSuccess(token) {
    this.error = null;
    localStorage.setItem('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
  }

}
