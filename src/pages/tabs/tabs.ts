import { Component } from '@angular/core';

import { FriendsPage } from '../friends/friends';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FriendsPage;

  constructor() {

  }
}
