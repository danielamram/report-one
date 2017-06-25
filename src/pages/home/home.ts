import {Component} from "@angular/core";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../providers/auth-service/auth-service";
import {SettingsPage} from "../settings/settings";
import {ReportConfig, ReportEnum, ReportOption} from "../../models/report-options";
import {DBService} from "../../providers/db-service/db-service";
import {CalendarPage} from "../calander/calendar";

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
  reportStatuses: ReportOption[];
  report: any;
  animate: string = 'in';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private dbService: DBService, public alertCtrl: AlertController) {
    this.reportStatuses = ReportConfig;
    this.report = this.dbService.getReport(this.authService.getUserId());
    this.authService.getCurrentUser().subscribe(users => {
      this.authService.currentUser = users.filter(user => {
        return user.id === this.authService.afAuth.auth.currentUser.uid;
      });
    });
  }

  logOut() {
    let confirm = this.alertCtrl.create({
      title: 'התנתקות מהמערכת',
      message: 'האם אתה בטוח שברצונך להתנתק?',
      buttons: [
        {
          text: 'אישור',
          handler: () => {
            this.authService.signOut();
          }
        },
        {
          text: 'ביטול',
          handler: () => {
            return;
          }
        }
      ]
    });
    confirm.present();
  }

  navigateSettings() {
    this.navCtrl.push(SettingsPage);
  }

  navigateCalendar() {
    this.navCtrl.push(CalendarPage,{id:this.authService.getUserId()});
  }

  updateReport(report: ReportEnum) {
    this.dbService.updateReport(this.authService.getUserId(), report);
  }
}
