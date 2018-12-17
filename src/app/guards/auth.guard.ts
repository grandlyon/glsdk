import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  /*canActivate() {
    return of(this.authorizationService.isAuthenticated());
  }*/
  canActivate() {
    return of(true);
  }

}
