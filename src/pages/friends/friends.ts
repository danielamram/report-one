import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {DBService} from "../../providers/db-service/db-service";
import {AuthService} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'friends-page',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  friendsIDs: any = [];
  friends: any = [];
  searchQuery: string;
  userList: any[] = [];
  originalUserList: any[] = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController ,private dbService: DBService, private authService: AuthService) {
    this.initializeItems();
    this.searchQuery = '';

  }

  initializeItems() {
    this.dbService.getUsers().subscribe(users => {
      this.originalUserList = users;
      if(!this.searchQuery){
        this.userList = this.originalUserList.slice(0, 4);
      }
    });
    let currUserId = this.authService.getUserId();
    this.dbService.getFriendsOfUser(currUserId).subscribe(friendsIds => {
      if(Object.keys(friendsIds).indexOf("$value") == -1) {
        this.friendsIDs = Object.keys(friendsIds);
      }
    });
    this.dbService.getFriendsListNames(currUserId).then(friendsList => {
      this.friends = friendsList;
    });

  }

  sendRequest(user) {
    let alert = this.alertCtrl.create({
      title: 'בקשת החברות נשלחה',
      subTitle: 'בקשת החברות שלך אל ' + user.displayName + " נשלחה בהצלחה",
      buttons: ['אוקי ו...?']
    });
    alert.present();
    if(!this.authService.currentUser[0].following) {
      this.authService.currentUser[0].following = {};
    }
    this.authService.currentUser[0].following[user.id] = false;
    this.dbService.setUser(this.authService.currentUser);
  }

  getItems(event: any) {
    let val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.userList = this.originalUserList.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }).slice(0, 10);
    }
  }
}
