import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DBService} from "../../providers/db-service/db-service";
import {AuthService} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'friends-page',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  friendsIDs: any = [];
  constructor(public navCtrl: NavController, dbService:DBService, authService: AuthService) {
    let currUserId = authService.getUserId();
    this.friendsIDs = dbService.getFriendsOfUser(currUserId);
  }
}
