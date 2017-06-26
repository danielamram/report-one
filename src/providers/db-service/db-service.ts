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
    this.users.update(currentUser[0].id, currentUser[0]);
  }

  getUsers() {
    return this.db.list('users');
  }

  updateReport(id: string, report: ReportEnum) {
    this.reports.$ref.child(id).set(report);
  }

  getReport(id: string) {
    return this.db.object('reports/' + new Date().toJSON().slice(0, 10) + '/' + id);
  }

  getFriendsOfUser(userId: string): FirebaseObjectObservable<any> {
    return this.db.object('users/' + userId + '/following');
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

  getFriendsListNames(userId:string) {
    let friendsList:string[] =[];
    return new Promise<string[]>((resolve,reject) => {this.getFriendsOfUser(userId).subscribe((friends) => {
      for(let friend of friends) {
        this.getNameByUserId(friend).then((name) => {
          friendsList.push(name);
        })
      }
      resolve(friendsList);
    })});
  }

  getNameByUserId(userId: string) {
    return new Promise<any>((resolve,reject) => {
      this.getUserObject(userId).subscribe((user) => {
      resolve({
        displayName: user.displayName,
      });
    })});
  }
}
