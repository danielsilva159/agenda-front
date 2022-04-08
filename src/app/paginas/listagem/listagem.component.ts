import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaModel } from 'src/app/models/pessoaModel';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { LoginServiceService } from 'src/app/services/loginService/login-service.service';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  mensagem: string | undefined;
  tipoMensagem = 'success';
  mostrarMensagem = false;

  constructor(
    private pessoaService: PessoaService,
    private router: ActivatedRoute,
    private loginService: LoginServiceService,
    private route: Router,
    private localStorageService: LocalStorageService

    ) { }
  contatos:PessoaModel[] = [];
  ngOnInit(): void {
    const usuario = this.loginService.userValue.user
    this.pessoaService.listagem(usuario.id).subscribe(dados =>{
        this.contatos = dados
      })


  }
  excluir(id: string | undefined, i: number){
    if(id){
      this.pessoaService.deletarPessoa(id).subscribe(pessoa =>{
        this.contatos.splice(i, 1)
        this.viewMensagem('Pessoa deletada com sucesso', 'success');
      },
      error =>{
        this.viewMensagem('Erro ao deletar a pessoa', 'erro');
      }
      )

    }

  }

  deslogar(){
    this.loginService.logout();
    this.route.navigate(['/'])

  }

  viewMensagem(mensagem: string, tipoMensagem: string){

    this.mostrarMensagem = true;
    this.mensagem = mensagem;
    this.tipoMensagem = tipoMensagem
    setTimeout(()=>{
      this.mostrarMensagem = false;
    }, 3000)


  }

}
