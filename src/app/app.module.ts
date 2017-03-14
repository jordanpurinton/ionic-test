import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import {OrbitalShiftApp} from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import {TabsPage} from "../pages/tabs/tabs";
import {WeekViewPage} from '../pages/week-view/week-view';
import {SettingsPage} from '../pages/settings/settings';
import {ShiftRequestPage} from '../pages/shift-request/shift-request';
import {UserService} from "../providers/user-service";
import {KeysPipe} from "../providers/keys-pipe";


@NgModule({
  declarations: [
    OrbitalShiftApp,
    HomePage,
    LoginPage,
    TabsPage,
    WeekViewPage,
    SettingsPage,
    ShiftRequestPage,
    KeysPipe
  ],
  imports: [
    IonicModule.forRoot(OrbitalShiftApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    OrbitalShiftApp,
    HomePage,
    LoginPage,
    TabsPage,
    WeekViewPage,
    SettingsPage,
    ShiftRequestPage
  ],
  providers: [AuthService, UserService, KeysPipe]
})
export class AppModule {}
