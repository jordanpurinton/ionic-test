"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tabs_1 = require("../tabs/tabs");
var LoginPage = (function () {
    function LoginPage(nav, authService, userService, globalFunctions) {
        this.nav = nav;
        this.authService = authService;
        this.userService = userService;
        this.globalFunctions = globalFunctions;
        this.registerCredentials = { username: '', password: '' };
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        localStorage.clear();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.globalFunctions.showLoading();
        this.userService.getUserIdFromUserName(this.registerCredentials.username)
            .subscribe(function (res) {
            console.log('USER ID ' + res);
            localStorage.setItem("UserId", res.toString());
            _this.userService.getEmployeeIdFromUserId(localStorage.getItem("UserId"))
                .subscribe(function (res) {
                console.log('EMPLOYEE ID ' + res);
                localStorage.setItem("EmployeeId", res);
                _this.authService.login(_this.registerCredentials)
                    .subscribe(function (res) {
                    console.log(res);
                    _this.globalFunctions.loading.dismissAll();
                    _this.nav.push(tabs_1.TabsPage);
                    localStorage.setItem("Username", _this.registerCredentials.username);
                    localStorage.setItem("isLoggedIn", "true");
                }, function (error) {
                    _this.globalFunctions.loading.dismissAll();
                    _this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
                    console.log(error);
                });
            }, function (err) {
                _this.globalFunctions.loading.dismissAll();
                _this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
                console.log(err);
            });
        }, function (err) {
            _this.globalFunctions.loading.dismissAll();
            _this.globalFunctions.showAlert("Uh oh!", "Something went wrong. Please re-enter your login credentials or check your connection.");
            console.log(err);
        });
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
