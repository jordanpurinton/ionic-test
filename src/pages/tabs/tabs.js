"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var home_1 = require('../home/home');
var week_view_1 = require("../week-view/week-view");
var shift_request_1 = require("../shift-request/shift-request");
var settings_1 = require("../settings/settings");
var login_1 = require("../login/login");
var TabsPage = (function () {
    function TabsPage(alertController, nav, userService) {
        this.alertController = alertController;
        this.nav = nav;
        this.userService = userService;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.home = home_1.HomePage;
        this.weekView = week_view_1.WeekViewPage;
        this.shiftRequest = shift_request_1.ShiftRequestPage;
        this.settingsPage = settings_1.SettingsPage;
    }
    TabsPage.prototype.logout = function () {
        var _this = this;
        var logoutAlert = this.alertController.create({
            title: 'Log Out',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Yes clicked');
                        _this.nav.setRoot(login_1.LoginPage);
                        localStorage.clear();
                        _this.nav.setRoot(login_1.LoginPage);
                    }
                }
            ]
        });
        logoutAlert.present();
    };
    TabsPage = __decorate([
        core_1.Component({
            selector: 'tab-page',
            templateUrl: 'tabs.html'
        })
    ], TabsPage);
    return TabsPage;
}());
exports.TabsPage = TabsPage;
