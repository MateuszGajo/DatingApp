import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) {
          this.router.navigateByUrl('/members');
          return false;
        }
        // this.toastr.error('You shall not pass!');
        return true;
      })
    );
  }
}
