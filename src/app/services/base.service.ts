import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseLoopBackApi } from '../shared/sdk/services/core/base.service';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import {map} from "rxjs/operators";

@Injectable()
export abstract class BaseService<T> {

  protected api: BaseLoopBackApi;

  constructor(api: BaseLoopBackApi) {
    this.api = api;
  }

  find(filter: LoopBackFilter): Observable<T[]> {
    return this.api.find(filter);
  }

  findById(id: any): Observable<T> {
    return this.api.findById(id);
  }

  count(where): Observable<number> {
    return this.api.count(where).pipe(
      map(result => result.count));
  }

  replaceOrCreate(data): Observable<T> {
    console.log('replaceOrCreate ', data);
    if (data.id) {
      return this.api.replaceById(data.id, data);
    }
    return this.api.replaceOrCreate(data);
  }

  deleteById(id: any): Observable<T> {
    return this.api.deleteById(id);
  }

}
