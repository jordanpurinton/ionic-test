import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {UserService} from "../../providers/user-service";
import {GlobalFunctions} from "../../providers/global-functions";
import {EventModalPage} from "../event-modal/event-modal";
import * as moment from 'moment';

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
  startDate: any;
  endDate: any;

  constructor(private nav: NavController, public navParams: NavParams, private userService: UserService, private globalFunctions: GlobalFunctions, private modalControl: ModalController)
  {
    this.getWeekInfo();
    this.userName = localStorage.getItem('Username');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad WeekViewPage');
  }

  /**
   * Get the initial 7 days of schedule event(s)
   * for an employee and display them on the screen.
   */
  getWeekInfo()
  {
    this.startDate = moment().startOf('day');
    this.endDate = moment().add(7, 'd').endOf('day');

    this.userService.getWeekView(this.startDate)
      .subscribe(
        data => {
          console.log(data);
          this.weekInfo = data;
          this.hasWeekEvents = true;

          for(let i = 0; i < data.length; i++)
          {
            this.eventTypeIdArray[i] = data[i].EventTypeId;
          }
        },
        err => {
          console.log(err);
          this.hasWeekEvents = false;
        }
      );
  }

  /**
   * Navigate to the previous week in the week picker
   * and display the events for that week.
   */
  getPreviousWeek()
  {
    this.weekInfo = null;
    this.startDate = moment(this.startDate).subtract(7, 'd');
    this.endDate = moment(this.endDate).subtract(7, 'd');

    this.userService.getPrevWeek(this.endDate)
      .subscribe(
        data => {
          console.log(data);
          this.weekInfo = data;
          this.hasWeekEvents = true;

          for(let i = 0; i < data.length; i++)
          {
            this.eventTypeIdArray[i] = data[i].EventTypeId;
          }
        },
        err => {
          console.log(err);
          this.hasWeekEvents = false;
        })
  }

  /**
   * Navigate to the next week in the week picker
   * and display the events for that week.
   */
  getNextWeek()
  {
    this.weekInfo = null;
    this.startDate = moment(this.startDate).add(7, 'd');
    this.endDate = moment(this.endDate).add(7, 'd');

    this.userService.getNextWeek(this.startDate)
      .subscribe(
        data => {
          console.log(data);
          this.weekInfo = data;
          this.hasWeekEvents = true;

          for(let i = 0; i < data.length; i++)
          {
            this.eventTypeIdArray[i] = data[i].EventTypeId;
          }
        },
        err => {
          this.hasWeekEvents = false;
          console.log(err);
        })

  }

  /**
   * Open a modal for a singular schedule
   * event, displaying expanded event information.
   * @param date
   */
  showEventModal(date)
  {
    let eventModal = this.modalControl.create(EventModalPage, {modalDate: date});
    eventModal.present();
  }

}
