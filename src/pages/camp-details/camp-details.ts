import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public dataService: Data) {
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
    console.log('ionViewDidLoad CampDetails');
  }

  saveForm(): void {
    let data = this.myForm.value;
    console.log(data);
  }
}
