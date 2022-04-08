import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "../localStorage/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private localStorageService: LocalStorageService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.localStorageService.get('token');
    if(authToken.token){
      req = req.clone(
        {setHeaders: {
          Authorization: "Bearer " + authToken.token
        }}

    );
    }

  return next.handle(req);
  }
}
