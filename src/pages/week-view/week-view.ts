import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {KeysPipe} from '../../providers/keys-pipe'
import {GlobalFunctions} from "../../providers/global-functions";
import {EventModalPage} from "../event-modal/event-modal";

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
  hasWeekEvents: boolean = true;
  coverRequestClicked: boolean = false;
  eventTypeIdArray: Array<number> = [];
  userName: any;

  constructor(private nav: NavController, public navParams: NavParams, private userService: UserService, private globalFunctions: GlobalFunctions, private modalControl: ModalController) {
    this.userName = localStorage.getItem('Username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeekViewPage');
    this.getWeekInfo();
  }

  ionViewDidEnter() {
  }

  getWeekInfo()
  {
    this.userService.getWeekView()
      .subscribe(
      data => {
        this.weekInfo = data;
        this.hasWeekEvents = true;
        for(let i = 0; i < data.length; i++)
        {
          this.eventTypeIdArray[i] = data[i].EventTypeId;
        }
      },
      err => {
        this.hasWeekEvents = false;
        console.error("Error: " + err);
      }
    );
  }

  showEventModal(date) {
    let eventModal = this.modalControl.create(EventModalPage, {modalDate: date});
    eventModal.present();
  }

}
