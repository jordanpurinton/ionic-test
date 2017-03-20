"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var login_1 = require('../pages/login/login');
var OrbitalShiftApp = (function () {
    function OrbitalShiftApp(platform) {
        this.rootPage = login_1.LoginPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.Splashscreen.hide();
        });
    }
    OrbitalShiftApp.prototype.isLoggedIn = function () {
        return localStorage.getItem('isLoggedIn');
    };
    OrbitalShiftApp = __decorate([
        core_1.Component({
            templateUrl: 'app.html'
        })
    ], OrbitalShiftApp);
    return OrbitalShiftApp;
}());
exports.OrbitalShiftApp = OrbitalShiftApp;
