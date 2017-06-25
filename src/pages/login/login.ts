import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service/auth-service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const RESEND_TIMER_TICK = 1000; // in ms
const RESEND_TIMER_PERIOD = 60; // in seconds

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage implements OnInit {
  logoState: string = "in";
  cloudState: string = "in";
  loginState: string = "in";
  formState: string = "in";
  smsSent: boolean = false;
  isNewUser: boolean = false;
  resendTimer: number = 0;
  private recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  signupForm: FormGroup;
  phoneNumberControl: FormControl;

  loginForm: FormGroup;
  confirmCodeControl: FormControl;
  displayNameControl: FormControl;
  cidControl: FormControl;

  constructor(public navCtrl: NavController, private authService: AuthService) {
  }

  ionViewDidLoad() {
    this.initRecaptcha();
  }

  private initRecaptcha(): boolean {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      return true;
    }
    return false;
  }

  private clearRecaptcha() {
    this.recaptchaVerifier.clear();
    this.recaptchaVerifier = null;
  }

  async signUp(phoneNumber: number, resend:boolean){
    if (resend && this.resendTimer > 0) {
      return;
    }

    this.initRecaptcha();
    if (!resend) {
      this.isNewUser = await this.authService.isNewUser(phoneNumber);
    }
    let smsSent: boolean = await this.authService.signUp(phoneNumber, this.recaptchaVerifier);
    this.resendTimer = RESEND_TIMER_PERIOD;
    if (!resend) {
      this.smsSent = smsSent;
    }
    this.setResendTimerTimeout();
    this.clearRecaptcha();
  }

  resendTimerTimeout() {
    this.resendTimer--;
    if (this.resendTimer > 0) {
      this.setResendTimerTimeout();
    }
  }
  private setResendTimerTimeout() {
    setTimeout(this.resendTimerTimeout.bind(this), RESEND_TIMER_TICK);
  }

  formatTimer(timer:number): string {
    return this.formatNumber(Math.floor(timer / 60)) + ":" + this.formatNumber(timer % 60);
  }
  formatNumber(n:number):string {
    let s: string = "";
    if (n < 10) {
      s += "0";
    }
    s += n;
    return s;
  }

  confirmLogin(confirmCode:string, displayName:string, cid:string){
    this.authService.confirm(confirmCode, displayName, cid);
  }

  shouldShowControlErrors(control:FormControl){
    return control.invalid && (control.touched || control.dirty);
  }

  ngOnInit() {
    this.createFormsControls();
    this.createForms();
  }

  createFormsControls() {
    this.phoneNumberControl = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('5\\d{8}')
      ])
    );

    this.confirmCodeControl = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('\\d{6}')
      ])
    );
    this.displayNameControl = new FormControl(
      '',
      Validators.required
    );
    this.cidControl = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('\\d{9}')
      ])
    );
  }

  createForms() {
    this.signupForm = new FormGroup({
      phoneNumberControl: this.phoneNumberControl
    });
    this.loginForm = new FormGroup({
      confirmCodeControl: this.confirmCodeControl,
      displayNameControl: this.displayNameControl,
      cidControl: this.cidControl
    });
  }
}
