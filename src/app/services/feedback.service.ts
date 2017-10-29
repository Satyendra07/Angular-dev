import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';


import 'rxjs/add/observable/of';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback : Feedback ): Observable<Feedback>{
    return this.restangular.all('feedback').post(feedback);

  }

}
