import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './helpers';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { ListagemComponent } from './paginas/listagem/listagem.component';
import { LoginComponent } from './paginas/login/login.component';

const routes: Routes = [
  //home
  {
      path: '',
      component: LoginComponent
  },
  //Products
  {
      path: 'listagem',
      component: ListagemComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'cadastro/:id',
    component: CadastroComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
