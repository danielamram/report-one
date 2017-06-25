import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DBService} from "../../providers/db-service/db-service";
import {AuthService} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class Friend implements OnChanges {

  @Input() friend: string;
  displayName: string;
  reportState: string;

  constructor(private dbService: DBService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let userId = changes['friend'].currentValue;
      this.dbService.getUserProperties(userId).then((user) => {
        this.displayName = user.displayName;
        this.reportState = user.reportStatus ? user.reportStatus.name : 'לא הוזן';
      });
  }

}
