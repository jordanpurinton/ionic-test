import {Component} from '@angular/core';
import {
  NavController, NavParams, ViewController, ModalController, AlertController,
  ToastController
} from 'ionic-angular';
import {UserService} from "../../providers/user-service";

@Component({
  selector: 'event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage {
  positionName: any;
  dateEvent: any;
  eventTypeId: any;
  modalDate: any = this.navParams.get('modalDate');
  noteUpdateSuccessful: boolean = false;

  constructor(public alertControl: AlertController,
              public navParams: NavParams,
              public viewControl: ViewController,
              public toastControl: ToastController,
              public userService: UserService)
  {
    this.getDateEvent(this.modalDate); // load information for the date passed in through nav params
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ModalPage');
  }

  /**
   * Dismiss modal and return to previous page.
   */
  closeModal()
  {
    this.viewControl.dismiss();
    this.getDateEvent(this.modalDate);
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
   * Grab schedule event information using the date passed in
   * through navigation parameters. This will display scheudle event
   * information on the page.
   * @param date
   */
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

  /**
   * Prompt to add/edit note for the opened schedule event.
   * Fires an API call that will change note text stored
   * in our db.
   * @param noteText
   * @param scheduleEventId
   */
  openNoteEdit(noteText, scheduleEventId)
  {
    let alert = this.alertControl.create({
      title: 'Edit/Add Event Note',
      inputs: [
        {
          value: noteText
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
          text: 'Submit',
          handler: data => {
            this.userService.updateNote(data[0], scheduleEventId)
              .map(res => console.log(res))
              .subscribe(
                res => // successful edit
                {
                  this.getDateEvent(this.modalDate); // reload event if note is updated successfully
                  let toastDate = new Date(this.dateEvent[0].EventStart);
                  let toast = this.toastControl.create({
                    message: 'Note added for event on ' +
                    (toastDate.getMonth() + 1) + "/" +
                    toastDate.getDate() + "/" +
                    toastDate.getFullYear(),
                    duration: 6000,
                    position: 'bottom',
                    showCloseButton: true,
                    closeButtonText: 'Dismiss'
                  });

                  toast.onDidDismiss(() => {
                    console.log('Dismissed toast');
                  });
                  toast.present();
                },
                err => // unsuccessful edit
                {
                  console.log(err);
                }
              )
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Prompt user to confirm cover request message.
   * Gives option to send a message alongside the request.
   *
   * @TODO actually implement this
   */
  onCoverRequestClick()
  {
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
            if (1 == 1) // successful cover request
            {
              let toastDate = new Date(this.dateEvent[0].EventStart);
              let toast = this.toastControl.create({
                message: 'Cover request created successfully for ' +
                (toastDate.getMonth() + 1) + '/' +
                toastDate.getDate() + '/' +
                toastDate.getFullYear() + ' (NOTHING HAPPENED THIS IS A TEST)',
                duration: 6000,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'Dismiss'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();

            }
            else // unsuccessful cover request
            {
              let toast = this.toastControl.create({
                message: 'Uh oh! Something went wrong and the cover request was not sent.',
                duration: 6000,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'Dismiss'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
              return;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
