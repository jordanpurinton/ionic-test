import {Component, ViewChild} from '@angular/core';
import { NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user-service";
import {GlobalFunctions} from "../../providers/global-functions";
import 'rxjs/Rx';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {username: 'jordan.purinton', password: 'abcdef'};  // EMPTY BY DEFAULT DON'T FORGET TO CHANGE THIS SWEET JESUS

  constructor(private nav: NavController,
              private authService: AuthService,
               private userService: UserService,
              private globalFunctions: GlobalFunctions) {}

  ionViewDidEnter()
  {
    localStorage.clear();
  }


  /**
   * Check user login information by making call to API.
   * If login is successful, UserId and EmployeeId are stored in local storage.
   */
  public login()
  {

    this.globalFunctions.showLoading(); // loading wheel

    // take username from input and check if there is a corresponding UserId for that username
    this.userService.getUserIdFromUserName(this.registerCredentials.username)
      .map(res => res.toString())
      .do(userId => localStorage.setItem('UserId', userId))
      .mergeMap(userId => this.userService.getEmployeeIdFromUserId(userId))
      .map(res => res.toString())
      .do(employeeId => localStorage.setItem('EmployeeId', employeeId))
      .mergeMap(res => this.authService.login(this.registerCredentials))
      .map(res => res)

      .subscribe(
        success => { // login success
          localStorage.setItem("Username", this.registerCredentials.username);
          this.nav.push(TabsPage);
          this.globalFunctions.loading.dismissAll();
        },
        err => { // login failure
          this.globalFunctions.loading.dismissAll();
          this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your" +
            " credentials or check your connection.");
          console.log(err);
        }
      )
  }


}
