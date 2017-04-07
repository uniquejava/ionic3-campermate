import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMaps} from "../../providers/google-maps";
import {Data} from "../../providers/data";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the Location page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class Location {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public maps: GoogleMaps,
              public platform: Platform,
              public dataService: Data,
              public alertCtrl: AlertController,
              public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Location');
  }

  setLocation(): void {

  }

  takeMeHome(): void {

  }

}
