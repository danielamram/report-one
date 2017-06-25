import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DBService} from "../../providers/db-service/db-service";
import {AuthService} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class Friend implements OnChanges {

  @Input() friend: string;
  cid: string;
  displayName: string;

  constructor(private dbService:DBService)  {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dbService.getReport(changes['friend'].currentValue).subscribe((report)=>{
      console.log('friend id: ',changes['friend'].currentValue);
      console.log('friend status: ',report);
    });
  }

}
