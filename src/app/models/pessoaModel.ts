import { UserModel } from "./userModel";

export interface PessoaModel{
  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  user?: UserModel;
}
