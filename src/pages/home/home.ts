import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {UserService} from "../../providers/user-service";
import { DatePicker } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  username = localStorage.getItem("username");
  nextEvent: any;
  dateEvent: any;
  email = '';
  dateTime: any  = new Date().toISOString();
  hasEvent: boolean = true;
  hasNextEvent: boolean = true;
  positionName: any;


  constructor(private userService: UserService) {
    this.getDateEvent();
    this.getNextEvent();
    // this.getPositionName(localStorage.getItem("PositionId"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  doItAll()
  {

  }

  getPositionName(positionId)
  {
    this.userService.getPositionName(positionId)
      .subscribe(
        data => {
          console.log(data);
          this.positionName = data;
        }
      );
  }

  getDateEvent()
  {
    this.userService.getDateEvent(this.dateTime)
      .subscribe(
        data => {
          console.log(data);
          this.dateEvent = data;
          // localStorage.setItem("PositionId", data[0].PositionId);
          this.hasEvent = true;
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
}
