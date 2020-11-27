import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/shared/auth/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {debugger
    
    request = request.clone({
      setHeaders: {
        'Authorization': `bearer ${this.auth.getToken()}`,
        //'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}



