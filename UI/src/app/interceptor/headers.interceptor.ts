import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, finalize, throwError } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        const token = localStorage.getItem('auth_token');
        if (!token) {
           return next.handle(req);
        }
        const headers = req.clone({
           headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(headers).pipe(
            retry(2),
            catchError((error: HttpErrorResponse)=>{
                console.log(`Error in: ${req.method} "${req.url}"`);
                return throwError(error);
            }),
            finalize(() =>{ const profile = `${req.method} "${req.urlWithParams}"`;}
            )
        );
    }
}