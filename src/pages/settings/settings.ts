import {Component, EventEmitter, Output} from "@angular/core";
import {AuthService} from "../../providers/auth-service/auth-service";
import {ReportUser} from "../../models/report-user";
import * as _ from "lodash";
import { DBService } from '../../providers/db-service/db-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public isEditMode: boolean = false;
  public user: any;
  public currentUser: ReportUser;
  public currentUserBefore: ReportUser;
  public users :any;

  @Output() public onUpdateDetails: EventEmitter<any>;

  constructor(private authService: AuthService, private dbService:DBService) {
    this.users = this.dbService.getUsers();
    this.onUpdateDetails = new EventEmitter();
    this.currentUser = authService.currentUser[0];
    this.currentUserBefore = _.cloneDeep(this.currentUser);
  }

  enableEditMode() {
    this.isEditMode = true;
  }

  cancelDetails() {
    this.isEditMode = false;
    this.currentUser = this.currentUserBefore;
  }

  updateDetails() {
    this.authService.updateUser(this.currentUser);
    this.isEditMode = false;
  }

  addPermision(user){
    this.dbService.addPermissionToUser(user, this.currentUser.id);
  }
}
