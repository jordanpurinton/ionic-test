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
  hasTodayEvent: boolean = false;


  constructor(private userService: UserService) {
    this.getTodayEvent();
    this.getNextEvent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getNextEvent()
  {
    console.log('hi');
    this.userService.getNextEvent()
      .subscribe(
      data => {
        console.log('data');
        this.nextEvent = data;
      },
      err => {
        console.log('err');
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
