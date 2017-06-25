import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CalendarModule } from "angular-calendar/dist/esm/src/index";
import { App } from './app.component';

import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login'
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { CalendarPage } from "../pages/calander/calendar";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environments/environment';
import { DBService } from '../providers/db-service/db-service';


@NgModule({
  declarations: [
    App,
    LoginPage,
    AboutPage,
    HomePage,
    TabsPage,
    SettingsPage,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    CalendarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LoginPage,
    AboutPage,
    HomePage,
    TabsPage,
    SettingsPage,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DBService
  ]
})
export class AppModule {}
