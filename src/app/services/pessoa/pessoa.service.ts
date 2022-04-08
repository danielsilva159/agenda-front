import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { PessoaModel } from 'src/app/models/pessoaModel';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  readonly url: string = 'http://localhost:3333/api/v1'

  constructor(private http: HttpClient, private alert: MatSnackBar) { }

  showMensagem(msg : string): void {
    this.alert.open(msg,' X ', {
        horizontalPosition: "right",
        verticalPosition: "top"

  })
}
  cadastroPessoa(pessoa: PessoaModel): Observable<PessoaModel>{
    console.log(pessoa);

    return this.http.post(`${this.url}/pessoas`, pessoa);
  }

  listagem(id: string): Observable<PessoaModel[]>{
    return this.http.get<PessoaModel[]>(`${this.url}/pessoas/lista/${id}`)

  }

  buscarPessoa(id: string): Observable<PessoaModel>{
    return this.http.get(`${this.url}/pessoas/${id}`)
  }

  atualizarPessoa(id: string, pessoa: PessoaModel): Observable<PessoaModel>{
    return this.http.put(`${this.url}/pessoas/cadastro/${id}`, pessoa )
  }

  deletarPessoa(id: string): Observable<any>{
   return this.http.delete(`${this.url}/pessoas/cadastro/${id}`)
  }

}
