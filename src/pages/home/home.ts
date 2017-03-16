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
  todayEvent: any;
  email = '';
  today: any  = new Date().toISOString();


  constructor(private userService: UserService) {
    // let username = localStorage.getItem("username");
    // let info = this.authService.getUserInfo();
    // this.username = info.name;
    // this.email = info.email;
    this.getNextEvent();
    this.getTodayEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getNextEvent()
  {
    this.userService.getNextEvent()
      .subscribe(
      data => {
        this.nextEvent = data;
        console.log(data);
      },
      err => {
        console.error("Error: " + err);
      }
    );

  }

  getTodayEvent()
  {
    this.userService.getTodayEvent()
      .subscribe(
        data => {
          this.todayEvent = data;
          console.log(data);
        },
        err => {
          console.error("Error: " + err)
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
