import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { LoginServiceService } from 'src/app/services/loginService/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string | undefined;
  tipoMensagem = 'success';
  mostrarMensagem = false;


  verificarLoginForm = this.loginFormBuilder.group({
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });
  verificarCadastroForm = this.cadastroFormBuilder.group({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  })
  constructor(
    private loginFormBuilder: FormBuilder,
    private cadastroFormBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logar(){
    this.loginService.buscarUsuario({
      email:this.verificarLoginForm.controls['email'].value,
      senha: this.verificarLoginForm.controls['senha'].value
    }).subscribe((usuario) => {
      const {user} = usuario;

      this.route.navigate(['/listagem'], {queryParams:{id: user.id}})
    },
      (erro) => {
        console.log('erro', erro);

      }
    )

  }



  cadastrar(){
    this.loginService.cadastrarUsuario({
      nome: this.verificarCadastroForm.controls['nome'].value,
      email: this.verificarCadastroForm.controls['email'].value,
      senha: this.verificarCadastroForm.controls['senha'].value
    }).subscribe(data =>{
      this.viewMensagem('Usuário cadastrado com sucesso', 'success')
    })
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
