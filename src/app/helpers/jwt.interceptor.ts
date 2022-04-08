import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginServiceService } from '../services/loginService/login-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.loginService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith('http://localhost:3333/api/v1');
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    authorization: `${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}
