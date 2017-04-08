import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

/*
 Generated class for the Data provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Data {

  constructor(public storage: Storage) {
    console.log('Hello Data Provider');
  }

  setMyDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('mydetails', newData);
  }

  setCampDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('campdetails', newData);
  }

  setLocation(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('location', newData);
  }

  getMyDetails(): Promise<any> {
    return this.storage.get('mydetails');
  }

  getCampDetails(): Promise<any> {
    return this.storage.get('campdetails');
  }

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

}
