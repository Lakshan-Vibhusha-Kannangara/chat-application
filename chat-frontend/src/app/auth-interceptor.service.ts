import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private cookieService: CookieService) {

        
    }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.get('authToken');
    
    if (authToken) {
      console.log("here's auth token ..............",authToken)
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}
