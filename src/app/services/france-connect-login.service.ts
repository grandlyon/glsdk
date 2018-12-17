import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import {Observable, of} from 'rxjs';
import { SDKToken } from '../shared/sdk/models/BaseModels';

const config = environment.franceConnect;

@Injectable()
export class FranceConnectLoginService implements LoginService {

  login(): Observable<SDKToken> {
    window.location.href = config.authorizeEndpoint;
    return of(null);
  }

}
