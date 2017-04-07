campermate
===
ionic3.0.1刚刚发布, 但是用ionic g page命令生成的代码有bug: https://github.com/driftyco/ionic-cli/issues/2070, 
需要将生成的IonicModule.forChild修改成IonicPageModule.forChild

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




