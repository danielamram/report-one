import { Pipe, PipeTransform } from '@angular/core';
import {DBService} from "../../providers/db-service/db-service";

/**
 * Generated class for the IdToUserPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'idToUser',
})
export class IdToUserPipe implements PipeTransform {
  users:any = [];
  constructor(private dbService: DBService) {
    this.dbService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(id: string) {
    return this.users.find((user) => user.id === id);
  }

}
