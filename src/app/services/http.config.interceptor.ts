import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { CommonService } from './common.service';
  
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    loaderToShow: any;
    constructor(private commonService: CommonService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = '';
  
      // console.log('USER: ', this.commonService.user.value.token);
      // Authentication by setting header with token value
      if (this.commonService.user.value && this.commonService.user.value.token) {
        request = request.clone({
          setHeaders: {
              Authorization: 'Bearer ' + this.commonService.user.value.token
          },
        });
        // console.log('request header: ', request.headers);
      }
  
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json',
          },
        });
      }
  
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      });
  
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event--->>>', event);
          }
          this.commonService.hideLoader();
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.commonService.hideLoader();
          return throwError(error);
        })
      );
    }
  }