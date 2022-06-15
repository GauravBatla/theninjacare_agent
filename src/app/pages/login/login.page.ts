import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { AlertTypeEnum } from 'src/app/services/error-handler/alert-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  otpdiv: boolean;
  mobile: number;
  mobileCheck: boolean = false;
  opt1: number;
  opt2: number;
  opt3: number;
  opt4: number;

  constructor(
    private commonService: CommonService,
    private navCtrl: NavController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.otpdiv = false;
  }
  
  blurMobile(event: any) {
    // console.log(event);
    if (event.target.value.length == 10) {
      this.mobileCheck = true;
    } else {
      this.mobileCheck = false;
    }
  }

  
  async onNext() {
    let no = this.mobile
    if(this.mobile.toString().length==10){
        this.commonService.showLoader();
        this.api.login({mobile: this.mobile,role_id:5}).then((data: any) => {
          console.log(data);
          if (data.status == 200) {
            this.otpdiv = true;
          }
        }).catch(err => {
          this.commonService.showAlert(AlertTypeEnum.Error, err.message);
        });

    }
  }


  onResendOTP() {
    this.onNext();
  }

  otpController(event, next, prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus();
    }
    else if(next && event.target.value.length > 0){
      next.setFocus();
    }
    else {
     return 0;
    } 
  }

  async OTPVerify() {
    let otpPin = `${this.opt1}${this.opt2}${this.opt3}${this.opt4}`
    console.log('->', otpPin);
    this.commonService.showLoader();
    this.api.otpVerify({mobile: this.mobile, otp: otpPin}).then((data: any) => {
      console.log(data);
      setTimeout(() => {
        this.navCtrl.navigateRoot('/tabs');
      }, 200);
    }).catch(err => {
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

}
