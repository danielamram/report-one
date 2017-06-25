import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../providers/auth-service/auth-service';
import {ReportUser} from '../../models/report-user';
import * as _ from "lodash";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public isEditMode: boolean = false;
  public user: any;
  public currentUser: ReportUser;
  public currentUserBefore: ReportUser;

  @Output() public onUpdateDetails: EventEmitter<any>;

  constructor(private authService: AuthService) {
    this.onUpdateDetails = new EventEmitter();
    this.currentUser = authService.currentUser[0];
    this.currentUserBefore = JSON.parse(JSON.stringify(this.currentUser));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  cancelDetails() {
    this.isEditMode = false;
    this.currentUser = _.cloneDeep(this.currentUserBefore);
  }

  updateDetails() {
    this.authService.updateUser(this.currentUser);
    this.isEditMode = false;
  }
}
