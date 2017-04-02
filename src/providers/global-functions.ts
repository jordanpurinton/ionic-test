import {Injectable} from "@angular/core";
import {AlertController, LoadingController, Loading} from "ionic-angular";

@Injectable()
/**
 * Helper class with global functions to be used throughout application.
 */
export class GlobalFunctions {
  loading: Loading;
  loadingText: string[] =
    [
      'Poking the matrix...',
      'Beeping and booping...',
      'Tweaking flux capacitor...',
      'Pinging hyperdrive generator...',
      'Calibrating mass relay...',
      'Entering event horizon...'
    ];

  constructor(private loadingCtrl: LoadingController, private alertController: AlertController,) {
  }

  /**
   * Display loading wheel while awaiting a task or response.
   */
  showLoading()
  {
    let rand = Math.floor(Math.random() * 6);
    console.log(rand)
    this.loading = this.loadingCtrl.create({
      content: this.loadingText[rand]
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
