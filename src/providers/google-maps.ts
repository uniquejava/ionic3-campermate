import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Connectivity} from "./connectivity";
import {Geolocation} from "@ionic-native/geolocation";

/*
 Generated class for the GoogleMaps provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialized: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMaker: any;
  apiKey: string;

  constructor(public connectivityService: Connectivity, public geolocation: Geolocation) {
    console.log('Hello GoogleMaps Provider');
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise(resolve => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        console.log("google maps javascript needs to be loaded");
        this.disableMap();
        if (this.connectivityService.isOnline()) {

          window['mapInit'] = _ => {
            this.initMap().then(_ => {
              resolve(true);
            });
            this.enableMap();
          };

          let script = document.createElement("script");
          script.id = "googleMaps";
          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }
          document.body.appendChild(script);
        }
      } else {
        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        } else {
          this.disableMap();
        }
      }

      this.addConnectivityListeners();
    });
  }

  initMap(): Promise<any> {
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then(position => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
      })
    });
  }

  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = 'block';
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = 'none';
    }
  }

  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(_ => {
      console.log('online');
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialized) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(_ => {
      console.log('offline');
      this.disableMap();
    });
  }

  changeMarker(lat: number, lng: number): void {
    let latLng = new google.maps.LatLng(lat, lng);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    if (this.currentMaker) {
      this.currentMaker.setMap(null);
    }
    this.currentMaker = marker;
  }

}
