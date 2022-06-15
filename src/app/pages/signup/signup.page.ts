import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

import { Camera, CameraResultType } from '@capacitor/camera';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm: FormGroup;
  imageUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private _apiService:ApiService
  ) { }

  ngOnInit() {
    this._buildForm();
  }
  
  private _buildForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([Validators.required,])),
        mobile: new FormControl('', Validators.compose([Validators.required,])),
        address: new FormControl('', Validators.compose([Validators.required,])),
        profile_image: new FormControl('', Validators.compose([Validators.required,])),
        account_name: new FormControl('', Validators.compose([Validators.required,])),
        account_number: new FormControl('', Validators.compose([Validators.required])),
        bank_name: new FormControl('', Validators.compose([])),
        ifsc_code: new FormControl('', Validators.compose([Validators.required])),
        // password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
        // confirm: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])),
      },
    );
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    console.log(image);
    this.imageUrl = `data:image/${image.format};base64,${image.base64String}`;
    if (this.imageUrl != null) {
      this.registerForm.patchValue({
        'profile_image': this.imageUrl
      });
    }
    // var imageUrl = image.webPath;
    console.log(this.imageUrl);
  };

  async register(){
    console.log(this.registerForm.value);
    this._apiService.signup(this.registerForm.value).then((data:any)=>{
        console.log(data);
        if(data.status == 200){
          
        }else if(data.status == 422){

        }
        
    }).catch((err:any)=>{
      console.log(err);
      
    })
    
  }

}

