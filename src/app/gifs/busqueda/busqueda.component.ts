import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  // ElementRef es generico
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  // ! = not null, el objeto nunca va a ser nulo

  constructor( private gifsService: GifsService)  {}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value=""
  }
}
