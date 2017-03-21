import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user-service";
import {GlobalFunctions} from "../../providers/global-functions";
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/Rx';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {username: '', password: ''};
  jwtHelper: JwtHelper = new JwtHelper();
  user: string;
  error: string;


  constructor(private nav: NavController, private authService: AuthService,
               private userService: UserService, private globalFunctions: GlobalFunctions) {

  }

  ionViewDidEnter()
  {
    localStorage.clear();
  }

  public login() {
    this.globalFunctions.showLoading();

    this.userService.getUserIdFromUserName(this.registerCredentials.username)
      .map(res => res.toString())
      .do(userId => localStorage.setItem('UserId', userId))
      .mergeMap(userId => this.userService.getEmployeeIdFromUserId(userId))
      .map(res => res.toString())
      .do(employeeId => localStorage.setItem('EmployeeId', employeeId))
      .mergeMap(res => this.authService.login(this.registerCredentials))
      .map(res => res)

      .subscribe(
        res => {
          // console.log(employeeId);
          localStorage.setItem("Username", this.registerCredentials.username);
          this.nav.push(TabsPage);
          this.globalFunctions.loading.dismissAll();
        },
        err => {
          this.globalFunctions.loading.dismissAll();
          this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your" +
            " credentials or check your connection.");
          console.log(err);
        }
      )
  }


}
