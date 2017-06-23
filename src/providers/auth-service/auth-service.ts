import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private confirmationResult:firebase.auth.ConfirmationResult;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  async signUp(phoneNumber: number, recaptchaVerifier:firebase.auth.RecaptchaVerifier){
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

  getUser() {
    return this.user;
  }

  confirm(confirmCode: string) {
    this.confirmationResult.confirm(confirmCode).then(()=> {
      console.log(this.afAuth.auth.currentUser);
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
