import { Injectable } from '@angular/core';
import { Order } from '../shared/sdk/models/Order';
import { OrderApi } from '../shared/sdk/services/custom/Order';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { LoopBackFilter } from '../shared/sdk/models/BaseModels';
import { OrderContribution } from '../shared/sdk/models';
import { Subject } from 'rxjs';
import { OrderContributionApi } from '../shared/sdk/services/custom';
import {map, tap} from "rxjs/operators";

@Injectable()
export class OrderService extends BaseService<Order> {

  private orderContributionsChangeSubject = new Subject<void>();
  private orderChangeSubject = new Subject<void>();

  constructor(private orderApi: OrderApi,
              private orderContributionApi: OrderContributionApi) {
    super(orderApi);
  }

  getContributions(order: Order, filter?: LoopBackFilter): Observable<OrderContribution[]> {
    return this.orderApi.getContributions(
      order.id,
      Object.assign({}, filter, { include: ['agent','order'] }),
    );
  }

  countContributions(order: Order): Observable<number> {
    return this.orderApi.countContributions(order.id).pipe(
      map(result => result.count));
  }

  get orderContributionsChange() {
    return this.orderContributionsChangeSubject;
  }

  createContribution(contribution: OrderContribution): Observable<OrderContribution> {
    return this.orderApi.createContributions(contribution.orderId, contribution).pipe(
      tap(() => this.orderContributionsChangeSubject.next()));
  }

  deleteContribution(contribution: OrderContribution): Observable<any> {
    return this.orderContributionApi.deleteById(contribution.id).pipe(
      tap(() => this.orderContributionsChange.next()));
  }

  delete(order: Order) {
    return this.orderApi.deleteById(order.id).pipe(
      tap(() => {
        this.orderChangeSubject.next();
      }));
  }
}
