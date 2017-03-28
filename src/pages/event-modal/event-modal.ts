import { Component } from '@angular/core';
import {
  NavController, NavParams, ViewController, ModalController, AlertController,
  ToastController
} from 'ionic-angular';
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

  constructor(public alertControl: AlertController,
              public navParams: NavParams,
              public viewControl: ViewController,
              public toastControl: ToastController,
              public userService: UserService) {
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

  onCoverRequestClick() {
    let alert = this.alertControl.create({
      title: 'Optional',
      message: 'Enter a message to send to admins with your cover request',
      inputs: [
        {
          name: 'Message',
          placeholder: 'Message'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (1==1) {
              // send a cover request
              let toastDate = new Date(this.dateEvent[0].EventStart);
                let toast = this.toastControl.create({
                  message: 'Cover request created successfully for ' +  toastDate.getMonth() + "/" + toastDate.getDate() + "/" + toastDate.getFullYear(),
                  duration: 5000,
                  position: 'top'
                });

                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });

                toast.present();

            } else {
              // uh oh
              return;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
