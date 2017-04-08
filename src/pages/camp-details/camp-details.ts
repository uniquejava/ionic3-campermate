import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Data} from "../../providers/data";

/**
 * Generated class for the CampDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camp-details',
  templateUrl: 'camp-details.html',
})
export class CampDetails {
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public formBuilder: FormBuilder, public dataService: Data) {
    this.myForm = formBuilder.group({
      gateAccessCode: ['54321', Validators.required],
      amenitiesCode: [''],
      wifiPassword: [''],
      phoneNumber: [''],
      departure: [''],
      notes: ['']
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(_ => {
      this.dataService.getCampDetails().then(details => {
        let savedDetails: any = false;
        if (details && typeof details != "undefined") {
          savedDetails = JSON.parse(details);
        }

        let formControls: any = this.myForm.controls;
        if (savedDetails) {
          formControls.gateAccessCode.setValue(savedDetails.gateAccessCode);
          formControls.amenitiesCode.setValue(savedDetails.amenitiesCode);
          formControls.wifiPassword.setValue(savedDetails.wifiPassword);
          formControls.phoneNumber.setValue(savedDetails.phoneNumber);
          formControls.departure.setValue(savedDetails.departure);
          formControls.notes.setValue(savedDetails.notes);
        }
      })
    });
  }

  saveForm(): void {
    let data = this.myForm.value;
    this.dataService.setCampDetails(data);
  }
}
