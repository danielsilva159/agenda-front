import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit{
  @Input() mensagem: string | undefined;
  @Input() tipoAlert = 'success'
  @Input() mostrarMensagem = false;

  constructor() { }

  ngOnInit(): void {}

}
