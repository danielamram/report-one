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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environments/environment';
import { DBService } from '../providers/db-service/db-service';
import {Friend} from "../pages/friend/friend";
import {keyValueFilterPipe} from "../pipes/keyValueFilter";
import { ParseFollowingPipe } from '../pipes/parse-following/parse-following';
import { IdToUserPipe } from '../pipes/id-to-user/id-to-user';
import { IdToReportPipe } from '../pipes/id-to-report/id-to-report';

@NgModule({
  declarations: [
    App,
    LoginPage,
    FriendsPage,
    Friend,
    HomePage,
    TabsPage,
    SettingsPage,
    keyValueFilterPipe,
    ParseFollowingPipe,
    IdToUserPipe,
    IdToReportPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    LoginPage,
    FriendsPage,
    HomePage,
    TabsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DBService,
    keyValueFilterPipe,
    IdToUserPipe,
    IdToReportPipe
  ]
})
export class AppModule {}
