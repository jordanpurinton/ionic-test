"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var GlobalFunctions = (function () {
    function GlobalFunctions(loadingCtrl, alertController) {
        this.loadingCtrl = loadingCtrl;
        this.alertController = alertController;
    }
    GlobalFunctions.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Just a sec...'
        });
        this.loading.present();
    };
    GlobalFunctions.prototype.showAlert = function (title, text) {
        var alert = this.alertController.create({
            title: title,
            subTitle: text,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    GlobalFunctions = __decorate([
        core_1.Injectable()
    ], GlobalFunctions);
    return GlobalFunctions;
}());
exports.GlobalFunctions = GlobalFunctions;
