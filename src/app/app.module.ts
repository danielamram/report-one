import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { App } from './app.component';

import { AuthService } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login'
import { FriendsPage } from '../pages/friends/friends';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { CalendarPage } from "../pages/calander/calendar";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environments/environment';
import { DBService } from '../providers/db-service/db-service';
import {Friend} from "../pages/friend/friend";
import {keyValueFilterPipe} from "../pipes/keyValueFilter";
import { ParseFollowingPipe } from '../pipes/parse-following/parse-following';
import { IdToUserPipe } from '../pipes/id-to-user/id-to-user';
import { IdToReportPipe } from '../pipes/id-to-report/id-to-report';
import { IdToRequestsPipe } from '../pipes/id-to-requests/id-to-requests';
import {CalendarModule} from "angular-calendar/dist/esm/src/index";


@NgModule({
  declarations: [
    App,
    LoginPage,
    FriendsPage,
    Friend,
    HomePage,
    TabsPage,
    SettingsPage,
    CalendarPage,
    SettingsPage,
    keyValueFilterPipe,
    ParseFollowingPipe,
    IdToUserPipe,
    IdToReportPipe,
    IdToRequestsPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LoginPage,
    FriendsPage,
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
    DBService,
    keyValueFilterPipe,
    IdToUserPipe,
    IdToReportPipe,
    IdToRequestsPipe
  ]
})
export class AppModule {}
