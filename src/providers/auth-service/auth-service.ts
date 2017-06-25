import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {DBService} from '../db-service/db-service';
import 'rxjs/add/operator/map';
import {ReportUser} from '../../models/report-user';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private confirmationResult: firebase.auth.ConfirmationResult;

  constructor(private afAuth: AngularFireAuth, private dbService: DBService) {
    this.user = this.afAuth.authState;
  }

  async isNewUser(phoneNumber): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const phoneNumberString = "+972" + phoneNumber;
      this.dbService.users.subscribe((users) => {
        resolve(users.find((user) => user.phoneNumber === phoneNumberString) === undefined);
      });
    });
  }

  async signUp(phoneNumber: number, recaptchaVerifier: firebase.auth.RecaptchaVerifier): Promise<any> {
    try {
      const phoneNumberString = "+972" + phoneNumber;
      this.confirmationResult = await this.afAuth.auth.signInWithPhoneNumber(phoneNumberString, recaptchaVerifier);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  getUser(): Observable<firebase.User> {
    return this.user;
  }

  getUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  confirm(confirmCode: string, displayName: string, cid:string) {
    this.confirmationResult.confirm(confirmCode).then(() => {
      if (displayName || cid) {
        let currentUser: ReportUser = {
          id: this.afAuth.auth.currentUser.uid,
          cid: cid,
          phoneNumber: this.afAuth.auth.currentUser.phoneNumber,
          displayName: displayName
        };

        this.dbService.setUser(currentUser);
      }
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
