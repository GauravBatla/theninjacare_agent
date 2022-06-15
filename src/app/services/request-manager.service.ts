import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestManagerService {

  url: string = 'https://www.theninjacare.com/api/v1/';

  constructor(
    private http: HttpClient,
  ) { }

  get(endpoint: string, param?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = { params: new HttpParams() };
    };

    if (param) {
      reqOpts.param = new HttpParams();
      for (let k in param) {
        reqOpts.param = reqOpts.param.set(k, param[k]);
      }
    }

    const URL = this.url + endpoint;

    return this.http.get(URL, reqOpts).pipe(map(response => {
      const res: any = response;
      return res;
    }));
  }

  post(endpoint: string, data: any, reqOpts?: any) {
    try {
      if (typeof reqOpts == 'undefined') {
        reqOpts = {};
        const headers = new HttpHeaders();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('timeout', '3000');
        reqOpts.headers = headers;
      }

      const URL = this.url + endpoint;

      return this.http.post(URL, data, reqOpts).pipe(map(response => {
        const res: any = response;
        return res;
      }));
    } catch (err) {
      console.log('POST http error: ', err);
    }
  }

  put(endpoint: string, data: any, reqOpts?: any) {
    const URL = this.url + endpoint;

    return this.http.put(URL, data, reqOpts).pipe(map(response => {
      const res: any = response;
      return res;
    }));
  }

  delete(endpoint: string, reqOpts?: any) {
    const URL = this.url + endpoint;

    return this.http.delete(URL, reqOpts).pipe(map(response => {
      const res: any = response;
      return res;
    }));
  }

  patch(endpoint: string, data: any, reqOpts?: any) {
    const URL = this.url + endpoint;

    return this.http.patch(URL, data, reqOpts).pipe(map(response => {
      const res: any = response;
      return res;
    }));
  }

}
