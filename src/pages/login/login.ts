import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import {TabsPage} from "../tabs/tabs";
import {UserService} from "../../providers/user-service";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {username: '', password: ''};
  tabBarElement: any;

  constructor(private nav: NavController, private authService: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, private userService: UserService) {
  }

  ionViewDidEnter()
  {
    localStorage.clear();
  }

  // ngOnInit()
  // {
  //   if(localStorage.getItem('isLoggedIn') == 'true')
  //     this.nav.push(TabsPage);
  // }

  public login() {
    this.showLoading();

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
                      this.loading.dismissAll();
                      this.nav.push(TabsPage);
                      localStorage.setItem("Username", this.registerCredentials.username);
                      localStorage.setItem("isLoggedIn", "true");
                    },
                    error => {
                      this.loading.dismissAll();
                      this.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
                      console.log(error);
                    });
              },
              err => {
                console.log(err);
              });
        },
          err => {
            console.log(err);
          });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Just a sec...'
    });
    this.loading.present();
  }

  showAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
