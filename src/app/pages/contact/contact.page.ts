import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  data:any
  constructor(
    private _apiService:ApiService,
    private _commonService:CommonService
  ) { }

  ngOnInit() {
    this.getSupport()
  }

  getSupport(){
   // this._commonService.showLoaderExtend()
    this._apiService.supporrtData().then((res:any)=>{
     // this._commonService.hideLoader()
      if(res.status == 200){
        console.log(res.data);
        
        this.data = res.data
      }
    })
  }

  onClick() {
    window.location.hostname = "geo:37.786971,-122.399677;u=35";
  }
}
