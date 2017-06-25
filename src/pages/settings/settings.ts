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

  @Output() public onUpdateDetails:EventEmitter<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService : AuthService) {
    this.onUpdateDetails = new EventEmitter();
    this.currentUser = authService.currentUser[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  disableEditMode() {
    this.isEditMode = false;
  }

  updateDetails(){
    // {"displayName":this.displayName, "phoneNumber":this.phoneNumber, "personalId":this.personalId}

  }
}
