import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  usuario: UserModel = {};
  private userSubject!: BehaviorSubject<UserModel>;
  public user!: Observable<UserModel>;


  readonly url: string = 'http://localhost:3333/api/v1'

  constructor(private http: HttpClient, private alert: MatSnackBar) {

    this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('usuario') as string));
    this.user = this.userSubject.asObservable();
  }

  showMensagem(msg : string): void {
    this.alert.open(msg,' X ', {
        horizontalPosition: "right",
        verticalPosition: "top"

  })
}

public get userValue(): any {
  return this.userSubject.value;
}
buscarUsuario(user: any): Observable<any>{
  return this.http.post(`${this.url}/sessions`, user)
  .pipe(map(usuario =>{
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.userSubject.next(usuario);
    return usuario;
    }))
  }

  cadastrarUsuario(user: UserModel): Observable<UserModel>{
    return this.http.post(`${this.url}/users`, user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next({});
}

}
