import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaModel } from 'src/app/models/pessoaModel';
import { UserModel } from 'src/app/models/userModel';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { LoginServiceService } from 'src/app/services/loginService/login-service.service';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario: UserModel | undefined;
  mensagem: string | undefined;
  tipoMensagem = 'success';
  mostrarMensagem = false;
  constructor(
    private cadastroForm: FormBuilder,
    private pessoaService: PessoaService,
    private localStorageService: LocalStorageService,
    private routes: ActivatedRoute,
    private loginService: LoginServiceService
    ) { }

  cadastro = this.cadastroForm.group({
    id: new FormControl(''),
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    telefone: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.usuario = this.loginService.userValue.user
    this.routes.params.subscribe(rota =>{
     if(rota['id'])
     this.pessoaService.buscarPessoa(rota['id']).subscribe(pessoa =>{
       this.cadastro.controls['id'].setValue(pessoa.id)
       this.cadastro.controls['nome'].setValue(pessoa.nome)
       this.cadastro.controls['telefone'].setValue(pessoa.telefone)
       this.cadastro.controls['email'].setValue(pessoa.email)
     })

    })

  }

  cadastrar(){
    const pessoa: PessoaModel = {
      nome: this.cadastro.controls['nome'].value,
      email: this.cadastro.controls['email'].value,
      telefone: this.cadastro.controls['telefone'].value,
      user: {
        id: this.usuario?.id,
        nome: this.usuario?.nome,
        email: this.usuario?.email
      }
    }
    if(this.cadastro.controls['id'].value !== ''){
      pessoa['id'] = this.cadastro.controls['id'].value;
      this.pessoaService.atualizarPessoa(this.cadastro.controls['id'].value, pessoa).subscribe(() =>{
        this.viewMensagem('Pessoa Atualizada com sucesso', 'success')
        this.cadastro.reset();
      }, error =>{
        this.viewMensagem('Erro ao atualizar cadastro', 'erro')
      })
    }else{
      this.pessoaService.cadastroPessoa(pessoa).subscribe(data =>{
        this.viewMensagem('Pessoa cadastrada com sucesso', 'success')
        this.cadastro.reset();

      })
  }
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
