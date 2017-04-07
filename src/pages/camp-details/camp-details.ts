import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public dataService: Data) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampDetails');
  }

  saveForm(): void {

  }
}
