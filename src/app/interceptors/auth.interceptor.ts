import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("id_token");
        
        if (idToken) {
            console.log("idToken:", idToken);
            // const cloned = req.clone({
            //     headers: req.headers.set("Authorization", idToken)
            // });
            const cloned = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: idToken
                }
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}