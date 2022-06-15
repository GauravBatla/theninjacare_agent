import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { CommonService } from '../services/common.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private navCtrl: NavController, private commonService: CommonService, private storage: Storage){
    this.storage.create();
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      this.storage.get('user').then((user: User) => {
        // console.log(user);
        if (user) {
          this.commonService.user.next(user);
          resolve(true);
        } else {
          console.log('User is not logged in');
          this.navCtrl.navigateRoot('/login');
          // resolve(false);
        }
      });
    });
  }
  
}
