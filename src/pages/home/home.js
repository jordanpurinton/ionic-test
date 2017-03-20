"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var HomePage = (function () {
    function HomePage(userService) {
        this.userService = userService;
        this.username = localStorage.getItem("username");
        this.email = '';
        this.today = new Date().toISOString();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.getNextEvent();
        this.getTodayEvent();
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.getNextEvent = function () {
        var _this = this;
        this.userService.getNextEvent()
            .subscribe(function (data) {
            _this.nextEvent = data;
            console.log(data);
        }, function (err) {
            console.error("Error: " + err);
        });
    };
    HomePage.prototype.getTodayEvent = function () {
        var _this = this;
        this.userService.getTodayEvent()
            .subscribe(function (data) {
            _this.todayEvent = data;
            console.log(data);
        }, function (err) {
            console.error("Error: " + err);
        });
    };
    HomePage.prototype.selectDate = function () {
        ionic_native_1.DatePicker.show({
            date: new Date(),
            mode: 'date'
        }).then(function (date) { return console.log('Got date: ', date); }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
