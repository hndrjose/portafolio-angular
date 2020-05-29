import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/prouducto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;

  producto: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient  ) {
      this.cargarProductos();
   }

   private cargarProductos() {

      return new Promise( (resolve, reject) => {
        this.http.get('https://angular-portafolio-59ef6.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.producto = resp;

          setTimeout(() => {
            this.cargando = false;
          }, 1500);
          resolve();
        });
      });


   }

   public obtenerproducto(id: string) {
     return this.http.get(`https://angular-portafolio-59ef6.firebaseio.com/productos/${id}.json`);
   }

   buscarProducto( termino: string ) {

      if (this.producto.length === 0) {
        // cargar Productos
        // ejecutar despues de la carga del producto
        this.cargarProductos().then(() => {

          // filtrar productos
            this.filtrarProductos( termino );
        });
      } else {
        // cargar productos
        this.filtrarProductos( termino );
      }
      // this.productoFiltrado = this.producto.filter( producto => {
      //   return true;
      // });
      // console.log(this.productoFiltrado);
   }

   private filtrarProductos( termino: string ) {

      this.productoFiltrado = [];

      termino.toLocaleLowerCase();

      this.producto.forEach( prod => {

        const titulotolower = prod.titulo.toLocaleLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || titulotolower.indexOf(termino) >= 0 ) {
            this.productoFiltrado.push( prod );
          }
      });
   }
}
