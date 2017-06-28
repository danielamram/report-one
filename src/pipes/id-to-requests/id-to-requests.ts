import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the IdToReportPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'idToRequests',
})
export class IdToRequestsPipe implements PipeTransform {
  constructor() {
  }

  transform(users:any, id:any) {
    if (users) {
      return users.filter((user) => {
        return (user.following !== undefined) && (user.following[id] !== undefined) && (user.following[id] === false);
      });
    }
    else {
      return [];
    }
  }
}
