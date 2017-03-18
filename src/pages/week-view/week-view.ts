import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {KeysPipe} from '../../providers/keys-pipe'
import {GlobalFunctions} from "../../providers/global-functions";

/*
  Generated class for the WeekView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-week-view',
  templateUrl: 'week-view.html'
})
export class WeekViewPage {
  weekInfo: any;
  constructor(private nav: NavController, public navParams: NavParams, private userService: UserService, private globalFunctions: GlobalFunctions) {
    this.getWeekInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeekViewPage');
  }


    getWeekInfo()
  {
    this.userService.getWeekView()
      .subscribe(
      data => {
        this.weekInfo = data;
        console.log(data);
      },
      err => {
        console.error("Error: " + err);
      }
    );
  }

}
