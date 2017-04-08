import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Data} from "../../providers/data";

/**
 * Generated class for the MyDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-details',
  templateUrl: 'my-details.html',
})
export class MyDetails {
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public formBuilder: FormBuilder, public dateService: Data) {
    this.myForm = formBuilder.group({
      carRegistration: ['abc'],
      trailerRegistration: [''],
      trailerDimensions: [''],
      phoneNumber: [''],
      notes: ['']
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(_ => {
      this.dateService.getMyDetails().then(details => {
        let savedDetails: any = false;
        if (details && typeof details != "undefined") {
          savedDetails = JSON.parse(details);
        }

        let formControls: any = this.myForm.controls;
        if (savedDetails) {
          formControls.carRegistration.setValue(savedDetails.carRegistration);
          formControls.trailerRegistration.setValue(savedDetails.trailerRegistration);
          formControls.trailerDimensions.setValue(savedDetails.trailerDimensions);
          formControls.phoneNumber.setValue(savedDetails.phoneNumber);
          formControls.notes.setValue(savedDetails.notes);
        }
      })
    })
  }

  saveForm(): void {
    let data = this.myForm.value;
    this.dateService.setMyDetails(data);
  }

}
