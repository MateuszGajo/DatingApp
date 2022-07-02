import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss'],
})
export class MainlayoutComponent implements OnInit {
  loggedIn = false;
  username: string;
  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername() {
    this.accountService.currentUser$.subscribe((user) => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  logout() {
    console.log('logout');
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }
}
