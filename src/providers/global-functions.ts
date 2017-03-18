
import {Injectable} from "@angular/core";
import {AlertController, LoadingController, Loading, NavController} from "ionic-angular";
import {LoginPage} from "../pages/login/login";

@Injectable()

export class GlobalFunctions {
  loading: Loading;

  constructor(private loadingCtrl: LoadingController, private alertController: AlertController,) {
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Just a sec...'
    });
    this.loading.present();
  }

  showAlert(title, text) {
    let alert = this.alertController.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }


}
