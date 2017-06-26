import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DBService} from "../../providers/db-service/db-service";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ReportConfig, ReportOption} from "../../models/report-options";

@Component({
  selector: 'friends-page',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  followingList: any;
  reportOptions = ReportConfig;

  constructor(public navCtrl: NavController, private dbService:DBService, authService: AuthService) {
    let currUserId = authService.getUserId();

    this.followingList = dbService.getFriendsOfUser(currUserId);
  }

  getOption(optionID) {
    let option = this.reportOptions.find((opt) => opt.id === optionID);
    if (!option) {
      option = {id:-1, name: 'לא הוזן', icon:'contact'};
    }
    return option;
  }
}
