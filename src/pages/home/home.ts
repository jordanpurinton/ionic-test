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



  constructor(private userService: UserService, public modalControl: ModalController) {
    this.getNextEvent();
    this.getDateEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getPositionName(positionId)
  {
    this.userService.getPositionName(positionId)
      .subscribe(
        data => {
          this.positionName = data;
          // console.log(data);
        }
      );
  }

  getDateEvent()
  {
    this.userService.getDateEvent(this.dateTime)
      .subscribe(
        data => {
          // console.log(data);
          this.dateEvent = data;
          this.hasEvent = true;
          localStorage.setItem('PositionId', data[0].PositionId);
          this.getPositionName(localStorage.getItem("PositionId"));
          this.eventTypeId = data[0].EventTypeId;

        },
        err => {
          this.hasEvent = false;
          console.log(err);
        }
      )
  }
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

  showEventModal(date) {
    let eventModal = this.modalControl.create(EventModalPage, {modalDate: date});
    eventModal.present();
  }

}
