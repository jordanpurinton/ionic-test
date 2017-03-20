"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_component_1 = require('./app.component');
var home_1 = require('../pages/home/home');
var login_1 = require('../pages/login/login');
var auth_service_1 = require('../providers/auth-service');
var tabs_1 = require("../pages/tabs/tabs");
var week_view_1 = require('../pages/week-view/week-view');
var settings_1 = require('../pages/settings/settings');
var shift_request_1 = require('../pages/shift-request/shift-request');
var user_service_1 = require("../providers/user-service");
var keys_pipe_1 = require("../providers/keys-pipe");
var global_functions_1 = require('../providers/global-functions');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.OrbitalShiftApp,
                home_1.HomePage,
                login_1.LoginPage,
                tabs_1.TabsPage,
                week_view_1.WeekViewPage,
                settings_1.SettingsPage,
                shift_request_1.ShiftRequestPage,
                keys_pipe_1.KeysPipe
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.OrbitalShiftApp),
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.OrbitalShiftApp,
                home_1.HomePage,
                login_1.LoginPage,
                tabs_1.TabsPage,
                week_view_1.WeekViewPage,
                settings_1.SettingsPage,
                shift_request_1.ShiftRequestPage
            ],
            providers: [auth_service_1.AuthService, user_service_1.UserService, keys_pipe_1.KeysPipe, global_functions_1.GlobalFunctions]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
