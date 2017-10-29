import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';


import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
    //return Observable.of(LEADERS).delay(2000);
  }

  getLeader(id: number): Observable<Leader>{
    return this.restangular.one('leaders', id).get();
  }


  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
    .map(leaders => leaders[0]);
    // return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
   
  }


}
