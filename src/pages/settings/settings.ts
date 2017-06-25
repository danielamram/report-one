import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";
import {ReportUser} from "../../models/report-user";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public isEditMode:boolean = false;
  public user:any;
  public currentUser:ReportUser;
  public currentUserBefore: ReportUser;

  @Output() public onUpdateDetails:EventEmitter<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : AuthService) {
    this.onUpdateDetails = new EventEmitter();
    this.currentUser = authService.currentUser[0];
    this.currentUserBefore = Object.assign({},this.currentUser) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  disableEditMode() {
    this.isEditMode = false;
    this.currentUser = this.currentUserBefore;
  }

  updateDetails(){
    this.authService.updateUser(this.currentUser);
    this.isEditMode = false;
  }
}
