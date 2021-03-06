campermate
===
ionic3.0.1刚刚发布, 但是用ionic g page命令生成的代码有bug: https://github.com/driftyco/ionic-cli/issues/2070, 
需要将生成的IonicModule.forChild修改成IonicPageModule.forChild

## Tech stack

* Ionic3.0.1(Lazy Load)
* FormBuilder
* network availability
* Google maps

### 1. setup (plugins)
```sh
ionic start campermate blank --v2
cd campermate
ionic g page Location
ionic g page MyDetails
ionic g page CampDetails
ionic g provider Data
ionic g provider GoogleMaps
npm install @types/google-maps --save
ionic g provider Connectivity

ionic plugin add cordova-plugin-geolocation --save
npm install @ionic-native/geolocation --save

ionic plugin add cordova-plugin-network-information --save
npm install @ionic-native/network --save

ionic plugin add cordova-sqlite-storage --save

ionic plugin add cordova-plugin-inappbrowser --save
npm install @ionic-native/in-app-browser --save

status-bar, keyboard, splash-screen, whitelist默认已经集成

```

### 2. app.module.ts
ionic 3引入了lazy load再也不必在app module中添加对Page的依赖了.

```js
declarations: pipes only
imports: IonicStorageModule.forRoot()
entryComponents: MyApp only
providers: Data, GoogleMaps, Connectivity, Geolocation, Network, InAppBrowser
```

## 3. Content-Security-Policy
```html
<meta http-equiv="Content-Security-Policy"
      content="font-src 'self' data:; img-src * data:; default-src gap://ready file://* *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *">
```

## 4. WKWebView plugin (config.xml)
ionic plugin add https://github.com/driftyco/cordova-plugin-wkwebview-engine.git --save

Cordova默认会使用UIWebView, 需要在config.xml中加入以下配置:
```xml
<allow-navigation href="http://localhost:8080/*"/>
<feature name="CDVWKWebViewEngine">
  <param name="ios-package" value="CDVWKWebViewEngine" />
</feature>
<preference name="CordovaWebViewEngine" value="CDVWKWebViewEngine" />
```

### 5. images
copy images to src/assets directory



## Form Builder vs. [(ngModel)]
1. 所有的inputs自动变成controls (还记得giflist中那个Fancy Searchbox么?)
2. 可以使用各种Validators.

### How to
1. 将所有的ion-item挪到form下, 结构:`ion-list>form>ion-item*n>ion-label[stacked]+ion-input`.
2. 给form加上[formGroup]="myForm"属性, 并监听(change)或(submit)="saveForm()"事件(监听change能实现自动保存form的功能,但一般都会监听submit)
3. 给所有的input指定formControlName属性
4. 在对应的类中定义myForm: FormGroup属性, 并在constructor中给this.myForm设置初始值.
5. 在saveForm中使用this.myForm.value得到用户输入的值.


```html
<form [formGroup]="myForm" (change)="saveForm()"></form>
```

```js
export class CampDetails {
  myForm: FormGroup;

  constructor(... public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      field1: ['5431', Validators.required],
      field2: [''],
      field3: ['']
    });
  }

  saveForm(): void {
    let data = this.myForm.value;
    this.dataService.saveData(data);
  }
}
```

### 检查网络状态
见connectivity.ts

### google maps
有两种方式: 一种是native的, 需要安装google maps cordova plugin, 另一种是引入google map javascript SDK, 本示例使用的后一种.

