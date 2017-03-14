import { Component } from "@angular/core";
import {HomePage} from '../home/home';
import {WeekViewPage} from "../week-view/week-view";
import {ShiftRequestPage} from "../shift-request/shift-request";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'tab-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  home: any = HomePage;
  weekView: any = WeekViewPage;
  shiftRequest: any = ShiftRequestPage;
  settingsPage: any = SettingsPage;

  constructor(){}
}
