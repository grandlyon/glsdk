import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class AgentGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  /*canActivate() {
    return this.authorizationService.getCurrentUser().pipe(
      map(user => user && !!user.roles.find(role => role.name === 'agent')));
  }*/
  canActivate() {
    return of(true);
  }

}
