import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: User | null = null;
    try {
      const parseUser = JSON.parse(localStorage.getItem('user') || '') || null;
      user = parseUser;
    } catch (err) {}
    this.accountService.setCurrentUser(user);
  }
}
