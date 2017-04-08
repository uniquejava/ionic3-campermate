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
    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(_ => {
      // this.maps.changeMarker(this.latitude, this.longitude);
    });

  }

  setLocation(): void {
    this.geolocation.getCurrentPosition().then(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.maps.changeMarker(this.latitude, this.longitude);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude
      };
      // this.dataService.setLocation(data);

      let alert = this.alertCtrl.create({
        title: 'Location set!',
        subTitle: 'You can now find your way back to your camp site from anywhere by clicking the button in the top right corner.',
        buttons: [{text: 'OK'}]
      });

      alert.present();
    })
  }

  takeMeHome(): void {
    if (!this.latitude || !this.longitude) {
      let alert = this.alertCtrl.create({
        title: 'Nowhere to go!',
        subTitle: 'You need to set your camp location first. For now, want to launch Maps to find your own way home?',
        buttons: [{text: 'OK'}]
      });

      alert.present();
    } else {
      let destination = this.latitude + ',' + this.longitude;
      if (this.platform.is('ios')) {
        window.open('maps://?q=' + destination, '_system');
      } else {
        let label = encodeURI('My Campsite');
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      }
    }
  }

}
