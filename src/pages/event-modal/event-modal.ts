import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {UserService} from "../../providers/user-service";

/*

 */
@Component({
  selector: 'event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage {
  positionName: any;
  dateEvent: any;
  eventTypeId: any;
  modalDate: any = this.navParams.get('modalDate');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewControl: ViewController, public userService: UserService) {
    this.getDateEvent(this.modalDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal() {
    this.viewControl.dismiss();
  }

  getPositionName(positionId)
  {
    this.userService.getPositionName(positionId)
      .subscribe(
        data => {
          this.positionName = data;
        }
      );
  }

  getDateEvent(date)
  {
    this.userService.getDateEvent(date)
      .subscribe(
        data => {
          // console.log(data);
          this.dateEvent = data;
          localStorage.setItem('PositionId', data[0].PositionId);
          this.getPositionName(localStorage.getItem("PositionId"));
          this.eventTypeId = data[0].EventTypeId;
        },
        err => {
          console.log(err);
        }
      )
  }
}
