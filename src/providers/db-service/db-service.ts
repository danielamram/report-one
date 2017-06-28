import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import "rxjs/add/operator/map";
import {ReportUser} from "../../models/report-user";
import {ReportEnum} from "../../models/report-options";
import {Observable} from "rxjs/Rx";

@Injectable()
export class DBService {
  users: FirebaseListObservable<ReportUser[]>;

  constructor(private db: AngularFireDatabase) {
    this.users = this.db.list('users');
  }
  setUser(currentUser: ReportUser) {
    this.users.update(currentUser.id, currentUser);
  }

  getUsers() {
    return this.db.list('users');
  }

  updateReport(id: string, report: ReportEnum, date: any) {
    let dateString = date.format('YYYY-MM-DD');
    this.db.object('reports/' + dateString).$ref.child(id).set(report);
  }

  getReport(id: string):any {
    return this.db.object('reports/' + new Date().toJSON().slice(0,10) + '/' + id);
  }

  getReports(){
    return this.db.object('reports/').take(1);
  }
}
