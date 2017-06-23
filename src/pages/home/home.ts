import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../providers/auth-service/auth-service';
import { reportOption } from '../../models/report-option';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
  ]
})
export class HomePage {
  reportOptions: reportOption[];
  animate:string = 'in';

  constructor(private authService: AuthService) {
    this.reportOptions = [
      {
        name: 'בדרך',
        icon: 'walk',
        id: 1
      },
      {
        name: 'חו"ל',
        icon: 'cafe',
        id: 2
      },
      {
        name: 'מחוץ ליחידה',
        icon: 'happy',
        id: 3
      },
      {
        name: 'קורס',
        icon: 'book',
        id: 4
      },
      {
        name: 'חופש',
        icon: 'card',
        id: 5
      },
      {
        name: 'מחלה',
        icon: 'medkit',
        id: 6
      },
    ];
  }

  logOut() {
    this.authService.signOut();
  }
}
