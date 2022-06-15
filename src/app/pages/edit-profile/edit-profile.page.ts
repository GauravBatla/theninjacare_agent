import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { userInterface } from 'src/app/models/user/user.interface';
import { CommonService } from 'src/app/services/common.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';
import { AlertTypeEnum } from 'src/app/services/error-handler/alert-type.enum';
// import { LeaveRequestPage } from '../leave-request/leave-request.page';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  userData: userInterface;
  editProfile :FormGroup
  userDetail:any
  imageUrl:string = null

  constructor(private router :Router,
    private commonService:CommonService,
   private formBuilder: FormBuilder ,
    private popoverCtrl: PopoverController,
    private api :ApiService) { }

  ngOnInit() {
    this.commonService.user.subscribe((data: any) => {
      this.userData = data.user;
      console.log(this.userData);
    });
    this._buildForm()
  }

  onEdit(){
    this.router.navigateByUrl('/edit-profile'); 
  }

  private _buildForm() {
    this.editProfile = this.formBuilder.group(
      {
        name: new FormControl(this.userData.name, Validators.compose([Validators.required, Validators.minLength(3)])),
      //  email: new FormControl(this.userData.email, Validators.compose([Validators.required])),
        mobile: new FormControl(this.userData.mobile, Validators.compose([Validators.required])),
        address: new FormControl(this.userData.address, Validators.compose([Validators.required])),
        profile_image: new FormControl(this.userData.profile_image, Validators.compose([])),
      },
    );
  }

  getProfile(){
   
  }
 

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    console.log(image);
    this.imageUrl = `data:image/${image.format};base64,${image.base64String}`;
    if (this.imageUrl != null) {
      this.editProfile.patchValue({
        'profile_image': this.imageUrl
      });
    }
    // var imageUrl = image.webPath;
  };


  async update() {
    console.log(this.editProfile.value);
    this.commonService.showLoader();
    this.api.updateProfile(this.editProfile.value).then((data: any) => {
      console.log(data);
      if (data.status == 200) {
        this.commonService.updateLocalUser(data.data);
        // this.navCtrl.navigateRoot('/tabs');
        this.commonService.showToast('Profile updated!');
      } else {
        this.commonService.showAlert(AlertTypeEnum.Error, data.message);
      }
    }).catch(err => {
      // console.log('ERROR', err);
      this.commonService.showAlert(AlertTypeEnum.Error, err.message);
    });
  }

}
