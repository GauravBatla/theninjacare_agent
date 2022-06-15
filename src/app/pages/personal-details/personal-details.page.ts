import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage implements OnInit {

  personalDetailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm() {
    this.personalDetailForm = this.formBuilder.group(
      {
        name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
        mobile: new FormControl('', Validators.compose([Validators.required])),
        address: new FormControl('', Validators.compose([Validators.required])),
        account_name: new FormControl('', Validators.compose([Validators.required])),
        account_number: new FormControl('', Validators.compose([Validators.required])),
        bank_name: new FormControl('', Validators.compose([Validators.required])),
        ifsc_code: new FormControl('', Validators.compose([Validators.required])),
      },
    );
  }

}
