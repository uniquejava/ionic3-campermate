import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root: string = "Location";
  tab2Root: string = "MyDetails";
  tab3Root: string = "CampDetails";

  constructor(public navCtrl: NavController) {

  }

}
