import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {secret} from '../assets/secret';

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  public login(credentials) {
    let body = JSON.stringify({username: credentials.username, password: credentials.password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: headers});

    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Part of the credentials were empty");
    }
    else {
      return this.http.post(secret.Uri + '/api/membership/authenticate', body, options)
        .map((response: Response) => response.statusText);
    }
  }

    // public
    //   logout()
    //   {
    //     return Observable.create(observer => {
    //       this.currentUser = null;
    //       observer.next(true);
    //       observer.complete();
    //     });
    //   }

}
