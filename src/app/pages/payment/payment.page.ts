import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  bal:any
  constructor(
    private commonService:CommonService
  ) { }

  ngOnInit() {
    this.commonService.user.subscribe((data: any) => {
      this.bal = data.user.wallet;
     // console.log(this.userData);
    });
  }

}
