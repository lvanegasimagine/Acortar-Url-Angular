import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN = 'b3461b36d06b50b72ebcb6be69a4182fa3a3fd48';

    request = request.clone({ setHeaders: {Authorization: 'Bearer ' + TOKEN} });
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      console.error(error);
      return throwError(error);
    }));
  }
}
