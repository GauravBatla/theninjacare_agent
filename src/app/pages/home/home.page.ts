import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedSegment: string;
  today: Date;
  requirementList: any = [];
  completedList: any = [];
  name:any
  constructor(
    private commonSerive: CommonService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.commonSerive.user.subscribe((data: any) => {
      this.name = data.user.name;
      
    });
  
    console.log(this.commonSerive.user.value);
    this.selectedSegment = 'new';
    this.today = new Date();

    this.getRequirementList();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  async getRequirementList() {
    this.commonSerive.showLoader();
    this.api.getRequirement().then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        var list = [];
        list = data.data;

        list.forEach((element) => {
          if (element.status == 'Active') {
            this.requirementList.push(element);
          } else {
            this.completedList.push(element);
          }
        });
      }
    });
  }

}
