import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {DBService} from "../../providers/db-service/db-service";
import {ReportConfig, ReportOption} from "../../models/report-options";


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage implements OnInit {
  id:string;
  date:Date;
  days_label:string[];
  reports:any;
  startPlanDay:Date;
  endPlanDay:Date;
  planStatus:any;
  reportStatuses:ReportOption[];
  constructor(public navCtrl:NavController, public navParams:NavParams, private dbService:DBService) {
  }

  ngOnInit():void {
    this.id = this.navParams.get('id');
    this.dbService.getReports().subscribe(this.handleReports.bind(this));
    this.date = new Date(Date.now());
    this.days_label = [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'
    ];
    this.reports = [];
    this.reportStatuses = ReportConfig;
    console.log( this.reportStatuses);
  }

  handleReports(reports) {
    let resultReports = [];
    let reportData;
    for (let report in reports) {
      try {
        reportData = reports[report][this.id];
        if (reportData) {
          resultReports.push({
            date: report,
            status: reportData
          });
        }
      } catch (e) {}
    }
    this.assignReports(resultReports);
  }

  assignReports(reportsData) {
    for (let reportData of reportsData) {
      let status = this.reportStatuses[reportData.status];
      this.reports = [...this.reports, {
        start: new Date(reportData.date),
        title: status.name,
        color: status.color
      }]
    }
  }

  dayClicked(event:any) {
    if(!this.startPlanDay){
      this.startPlanDay = event.day.date;
    }
    else if(event.date > this.startPlanDay){
      this.endPlanDay = event.day.date;
    }
  }
}

