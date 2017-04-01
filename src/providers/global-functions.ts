import {Injectable} from "@angular/core";
import {AlertController, LoadingController, Loading, NavController} from "ionic-angular";

@Injectable()
/**
 * Helper class with global functions to be used throughout application.
 */
export class GlobalFunctions {
  loading: Loading;

  constructor(private loadingCtrl: LoadingController, private alertController: AlertController,) {
  }

  /**
   * Display loading wheel while awaiting a task or response.
   */
  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Just a sec...'
    });
    this.loading.present();
  }

  /**
   * Present alert
   * @param title
   * @param text
   */
  showAlert(title, text)
  {
    let alert = this.alertController.create({
      title: title,
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present();
  }


}
