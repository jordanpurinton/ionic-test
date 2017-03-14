import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {username: '', password: ''};

  constructor(private nav: NavController, private authService: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  ngOnInit()
  {
    if(localStorage.getItem('isLoggedIn') == 'true')
      this.nav.push(TabsPage);
  }

  public login() {
    this.showLoading();

    this.authService.login(this.registerCredentials)
      .subscribe(

        data => {
          this.loading.dismissAll();
          console.log('User logged in successfully!');
          this.nav.push(HomePage);
          localStorage.setItem("username", this.registerCredentials.username);
          localStorage.setItem("isLoggedIn", "true");
        },

        error => {
          this.loading.dismissAll();
          this.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
          console.log(error);
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
