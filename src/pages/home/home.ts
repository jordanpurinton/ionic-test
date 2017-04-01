import {Component} from '@angular/core';
import {NavController, AlertController, ModalController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {UserService} from "../../providers/user-service";
import { DatePicker } from 'ionic-native';
import {EventModalPage} from "../event-modal/event-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  username = localStorage.getItem("username");
  nextEvent: any;
  dateEvent: any;
  email = '';
  eventTypeId: any;
  dateTime: any  = new Date().toISOString();
  hasEvent: boolean = true;
  hasNextEvent: boolean = true;
  positionName: any;

  constructor(private userService: UserService, public modalControl: ModalController)
  {
    this.getNextEvent();
    this.getDateEvent();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad HomePage');
  }

  /**
   * Get event information for the current date and the next
   * schedule event (if there is one).
   */
  ionViewDidEnter() {
    this.getNextEvent();
    this.getDateEvent();
  }

  /**
   * Use positionId from local storage to retrieve the employee's position title.
   * @param positionId
   */
  getPositionName(positionId)
  {
    this.userService.getPositionName(positionId)
      .subscribe(
        data => {
          this.positionName = data;
        }
      );
  }

  /**
   * Grab schedule event information for the date
   * selected in the date picker and display information.
   */
  getDateEvent()
  {
    this.userService.getDateEvent(this.dateTime)
      .subscribe(
        data => { // success
          this.dateEvent = data;
          this.hasEvent = true;
          localStorage.setItem('PositionId', data[0].PositionId);
          this.getPositionName(localStorage.getItem("PositionId"));
          this.eventTypeId = data[0].EventTypeId;

        },
        err => { // fail
          this.hasEvent = false;
          console.log(err);
        }
      )
  }

  /**
   * Take the current date and the next schedule event
   * on employee's schedule (if there is one) and displays
   * at the bottom of the screen.
   */
  getNextEvent()
  {
    this.userService.getNextEvent()
      .subscribe(
      data => {
        this.nextEvent = data;
        this.hasNextEvent = true;
      },
      err => {
        this.hasNextEvent = false;
        console.error(err);
      }
    );

  }

  /**
   * Show date in date picker.
   */
  selectDate()
  {
    DatePicker.show({
      date: new Date(),
      mode: 'date'
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  /**
   * Open a modal for a singular schedule event, displaying expanded event information.
   * @param date
   */
  showEventModal(date)
  {
    let eventModal = this.modalControl.create(EventModalPage, {
      modalDate: date,
      });

    eventModal.onDidDismiss(() =>
    {
      this.getDateEvent();
    });

    eventModal.present();
  }

}
