import { Pipe, PipeTransform } from '@angular/core';
import {DBService} from "../../providers/db-service/db-service";

/**
 * Generated class for the IdToReportPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'idToReport',
})
export class IdToReportPipe implements PipeTransform {
  reports:any = [];
  constructor(private dbService: DBService) {
    this.dbService.getReports().subscribe((report) => {
      this.reports = report;
    });
  }

  transform(id: string) {
    return this.reports.find((report) => report.$key  === id);
  }
}
