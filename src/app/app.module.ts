import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { LoginComponent } from './paginas/login/login.component';
import { ListagemComponent } from './paginas/listagem/listagem.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AppRoutingModule} from './app.router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MensagemComponent } from './componentes/alert/mensagem/mensagem.component';
import { ErrorInterceptor, JwtInterceptor } from './helpers';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListagemComponent,
    CadastroComponent,
    MensagemComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
