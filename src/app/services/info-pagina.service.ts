import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any = [];

  constructor( private http: HttpClient ) {

    this.cargarInfo();
    this.cargarEquipo();

   }

   private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (res: InfoPagina) => {

      this.cargada = true;
      this.info = res;
    //  console.log(this.info);
    });
   }

   private cargarEquipo() {
    this.http.get('https://angular-portafolio-59ef6.firebaseio.com/equipo.json')
    .subscribe( (res: any[]) => {

      this.cargada = true;
      this.equipo = res;
    });
   }
}
