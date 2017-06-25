import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { ReportUser } from '../../models/report-user';
import {ReportConfig, ReportEnum} from '../../models/report-options';

@Injectable()
export class DBService {
  users: FirebaseListObservable<ReportUser[]>;
  reports: FirebaseObjectObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list('users');
    this.reports = this.db.object('reports/' + new Date().toJSON().slice(0,10));
  }

  setUser(currentUser: ReportUser) {
    this.users.update(currentUser.id, currentUser);
  }

  updateReport(id: string, report: ReportEnum) {
    this.reports.$ref.child(id).set(report);
  }

  getReport(id: string) {
    return this.db.object('reports/' + new Date().toJSON().slice(0, 10) + '/' + id);
  }

  getFriendsOfUser(userId: string): FirebaseObjectObservable<any> {
    return this.db.object('users/' + userId + '/friends');
  }

  private getUserObject(userId: string): FirebaseObjectObservable<any> {
    return this.db.object('users/' + userId);
  }

  async getUserProperties(userId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getReport(userId).subscribe((report) => {
        this.getUserObject(userId).subscribe((user) => {
          resolve({
            displayName: user.displayName,
            reportStatus: (ReportConfig.find((reportOption)=>reportOption.id===report['$value']))
          });
        });
      });
    });
  }
}
