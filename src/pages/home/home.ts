import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = localStorage.getItem("username");
  email = '';
  constructor(private nav: NavController, private authService: AuthService, private alertController: AlertController) {
    // let username = localStorage.getItem("username");
    // let info = this.authService.getUserInfo();
    // this.username = info.name;
    // this.email = info.email;
  }

  public logout() {
    // this.auth.logout().subscribe(succ => {
    //     this.nav.setRoot(LoginPage)
    // });
    let logoutAlert = this.alertController.create({
      title : 'Log Out',
      message : 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            localStorage.clear();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    logoutAlert.present();
  }
}
