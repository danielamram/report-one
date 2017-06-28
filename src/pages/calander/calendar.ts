import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {DBService} from "../../providers/db-service/db-service";
import {ReportConfig, ReportOption} from "../../models/report-options";
import * as moment from "moment"

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage implements OnInit {
  id:string;
  date:Date;
  days_label:string[];
  reports:any;
  startPlanDay:any;
  endPlanDay:any;
  planStatus:any;
  editMode:boolean;
  reportStatuses:ReportOption[];

  constructor(public navCtrl:NavController, public navParams:NavParams, private dbService:DBService) {
  }

  ngOnInit():void {
    this.id = this.navParams.get('id');
    this.dbService.getReports().subscribe(this.handleReports.bind(this));
    this.date = new Date(Date.now());
    this.days_label = [
      'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'
    ];
    this.reports = [];
    this.reportStatuses = ReportConfig;
    this.editMode = false;
    this.startPlanDay = moment().format("YYYY-MM-DD");
    this.endPlanDay = moment().format("YYYY-MM-DD");
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

  saveEdit() {
    let currentDate = moment(this.startPlanDay);

    while (currentDate <= moment(this.endPlanDay)) {
      this.dbService.updateReport(this.id, this.planStatus, currentDate);
      currentDate = moment(currentDate, "YYYY-MM-DD").add('days', 1);
    }

    this.dbService.getReports().subscribe(this.handleReports.bind(this));

    this.reports = [];
    this.toggleEditMode();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  setEndDay() {
    this.endPlanDay = this.startPlanDay;
  }
}

