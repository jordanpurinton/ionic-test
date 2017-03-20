"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.userId = localStorage.getItem("UserId");
        this.employeeId = localStorage.getItem("EmployeeId");
    }
    UserService.prototype.getUserIdFromUserName = function (username) {
        return this.http.get("http://localhost:56586/api/users/get-userid/" + username)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getEmployeeIdFromUserId = function (userId) {
        return this.http.get("http://localhost:56586/api/employee/get-id/" + userId)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getTodayEvent = function () {
        return this.http.get("http://localhost:56586/api/schedule-events/today-events/" + this.employeeId)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getNextEvent = function () {
        return this.http.get("http://localhost:56586/api/schedule-events/next-event/" + this.employeeId)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getWeekView = function () {
        return this.http.get("http://localhost:56586/api/schedule-events/week-events/" + this.employeeId)
            .map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
