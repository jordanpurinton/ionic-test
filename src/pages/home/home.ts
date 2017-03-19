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


  constructor(private userService: UserService) {
    this.getDateEvent();
    this.getNextEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getDateEvent()
  {
    this.userService.getDateEvent(this.dateTime)
      .subscribe(
        data => {
          console.log(data);
          this.dateEvent = data;
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
      },
      err => {
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
