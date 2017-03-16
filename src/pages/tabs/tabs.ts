import { Component } from "@angular/core";
import {HomePage} from '../home/home';
import {WeekViewPage} from "../week-view/week-view";
import {ShiftRequestPage} from "../shift-request/shift-request";
import {SettingsPage} from "../settings/settings";
import {AlertController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {UserService} from "../../providers/user-service";

@Component({
  selector: 'tab-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  home: any = HomePage;
  weekView: any = WeekViewPage;
  shiftRequest: any = ShiftRequestPage;
  settingsPage: any = SettingsPage;
  constructor(private alertController: AlertController, public nav: NavController, public userService: UserService){
  }



  logout() {

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
            this.nav.setRoot(LoginPage);
            localStorage.clear();
          }
        }
      ]
    });
    logoutAlert.present();
  }
}
