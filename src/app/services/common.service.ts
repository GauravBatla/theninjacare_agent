import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user/user';
import { AlertTypeEnum } from './error-handler/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  alert: HTMLIonAlertElement;

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  passedData: any;
  extraData: any;
  flag: any;

  constructor(
    private storage: Storage,
    private readonly loadingCtrl: LoadingController,
    private readonly toastctrl: ToastController,
    private readonly alertCtrl: AlertController
  ) {}

  showLoader = async () => {
    this.loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      keyboardClose: true,
      spinner: 'bubbles',
      duration: 3000,
    });
    await this.loading.present();
  };

  showLoaderExtend = async () => {
    this.loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      keyboardClose: true,
      spinner: 'bubbles',
    });
    await this.loading.present();
  };

  hideLoader = async () => {
    this.loadingCtrl
      .getTop()
      .then((v) => (v ? this.loadingCtrl.dismiss() : null));
  };

  showToast = async (message: string) => {
    this.toast = await this.toastctrl.create({
      animated: true,
      message: message,
      duration: 2000,
      color: 'dark',
      mode: 'ios',
    });
    await this.toast.present();
  };

  showAlert = async(alertType: AlertTypeEnum, message: string) => {
    switch (alertType) {
      case AlertTypeEnum.Error:
        this.alert = await this.alertCtrl.create({
          header: 'Error',
          subHeader: '',
          message: message,
          buttons: ['OK']
        });
        this.alert.present();
        break;

      case AlertTypeEnum.Warning:
        this.alert = await this.alertCtrl.create({
          header: 'Warning',
          subHeader: '',
          message: message,
          buttons: ['OK']
        });
        this.alert.present();
        break;

      case AlertTypeEnum.Information:
        this.alert = await this.alertCtrl.create({
          header: 'Information',
          subHeader: '',
          message: message,
          buttons: ['OK']
        });
        this.alert.present();
        break;
    
      default:
        break;
    }
  }

  updateLocalUser=(user)=>{
    const tempUser = this.user.value;
    tempUser.user = user;
    this.user.next(tempUser);
    this.storage.set('user', tempUser);
  }

  logout = async () => {
    this.storage.remove('user');
  };

  public setData(data) {
    this.passedData = data;
  }

  public getData() {
    return this.passedData;
  }

  public setExtraData(exData, flag) {
    this.extraData = exData;
    this.flag = flag
  }

  public getExtraData() {
    let body = {
      data: this.extraData,
      flag: this.flag
    };
    return body;
  }
}
