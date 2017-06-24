import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SettingsPage } from '../settings/settings';
import { ReportConfig, ReportEnum, ReportOption } from '../../models/report-options';
import { DBService } from '../../providers/db-service/db-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
  ]
})
export class HomePage {
  reportOptions: ReportOption[];
  report: any;
  animate:string = 'in';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private dbService: DBService) {
    this.reportOptions = ReportConfig;
    this.report = this.dbService.getReport(this.authService.getUserId());
  }

  logOut() {
    this.authService.signOut();
  }

  navigateSettings() {
    this.navCtrl.push(SettingsPage);
  }

  updateReport(report: ReportEnum) {
    this.dbService.updateReport(this.authService.getUserId(), report);
  }
}
