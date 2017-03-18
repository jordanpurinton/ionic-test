import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user-service";
import {GlobalFunctions} from "../../providers/global-functions";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {username: '', password: ''};

  constructor(private nav: NavController, private authService: AuthService,
               private userService: UserService, private globalFunctions: GlobalFunctions) {

  }

  ionViewDidEnter()
  {
  }

  public login() {
    this.globalFunctions.showLoading();

    this.userService.getUserIdFromUserName(this.registerCredentials.username)
      .subscribe(
        res => {
          console.log('USER ID ' + res);
          localStorage.setItem("UserId", res.toString());
          this.userService.getEmployeeIdFromUserId(localStorage.getItem("UserId"))
            .subscribe(
              res => {
                console.log('EMPLOYEE ID ' + res);
                localStorage.setItem("EmployeeId", res);
                this.authService.login(this.registerCredentials)
                  .subscribe(
                    res => {
                      console.log(res);
                      localStorage.setItem("isLoggedIn", "true");
                      localStorage.setItem("Username", this.registerCredentials.username);
                      this.globalFunctions.loading.dismissAll();
                      this.nav.push(TabsPage);
                    },
                    error => {
                      this.globalFunctions.loading.dismissAll();
                      this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
                      console.log(error);
                    });
              },
              err => {
                this.globalFunctions.loading.dismissAll();
                this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
                console.log(err);
              });
        },
          err => {
            this.globalFunctions.loading.dismissAll();
            this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
            console.log(err);
          });
  }

}
