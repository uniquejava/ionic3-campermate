import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public dateService: Data) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDetails');
  }

  saveForm(): void {

  }

}
