import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Paging} from '../_models';

@Injectable()
export class ButterCMSService {
  private static baseURL = 'https://api.buttercms.com/';
  private api_token = '321478403e868f0fc41f0115731f330ff720ce0b';


  constructor(private http: HttpClient) {
  }

  customers(): Observable<{ meta: any, data: any[] }> {
    return this.http.get<Paging>(ButterCMSService.baseURL + 'v2/pages/customer_case_study/', {params: this.getParams()})
      .pipe(
        map(response => {
          return {
            meta: response.meta,
            data: response.data
          };
        }));
  }

  customer(slug: string): Observable<{ data: any }> {
    if (!slug) {
      slug = '';
    }
    return this.http.get<Paging>(ButterCMSService.baseURL + `v2/pages/customer_case_study/${slug}`, {params: this.getParams()})
      .pipe(
        map(response => {
          return response;
        }));
  }

  private getParams() {
    return {
      'auth_token': this.api_token
    };
  }
}
