import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { ReportUser } from '../../models/report-user';
import {ReportConfig, ReportEnum} from '../../models/report-options';
import {Observable} from "rxjs/Rx";

@Injectable()
export class DBService {
  users: FirebaseListObservable<ReportUser[]>;
  reports: FirebaseObjectObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list('users');
    this.reports = this.db.object('reports/' + new Date().toJSON().slice(0,10));
  }

  setUser(currentUser: ReportUser) {
    this.users.update(currentUser[0] ? currentUser[0].id : currentUser.id, currentUser[0] ? currentUser[0] : currentUser);
  }

  getUsers() {
    return this.db.list('users');
  }

  getReports() {
    return this.db.list('reports/' + new Date().toJSON().slice(0, 10));
  }

  updateReport(id: string, report: ReportEnum, date: any) {
    let dateString = date.format('YYYY-MM-DD');
    this.db.object('reports/' + dateString).$ref.child(id).set(report);
  }

  getReport(id: string) {
    return this.db.object('reports/' + new Date().toJSON().slice(0,10) + '/' + id);
  }

  getReports(){
    return this.db.object('reports/').take(1);
  }

  getFriendsOfUser(userId: string): any {
    return this.db.object('users/' + userId + '/following');
  }

  addPermissionToUser(user:any, id:string) {
    user.following[id] = true;
    this.users.update(user.id, user)
  }

  private getUserObject(userId: string): FirebaseObjectObservable<any> {
    return this.db.object('users/' + userId);
  }

  getUserProperties(userId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getReport(userId).first().subscribe((report) => {
        this.getUserObject(userId).first().subscribe((user) => {
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
