import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/models/user/user.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: userInterface;
  name: any
  constructor(private router: Router, private coomonService: CommonService) { }

  ngOnInit() {
    this.coomonService.user.subscribe((data: any) => {
      this.name = data.user.name;

    });

    console.log(this.userData);

  }

  onEdit() {
    this.router.navigateByUrl('/edit-profile');
  }


  logOut() {
    this.coomonService.logout().then((a: any) => {
      this.router.navigateByUrl('/login');

    })
  }
}
