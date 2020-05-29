import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { DetalleProducto } from '../../models/detalleProducto.models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: DetalleProducto;
  id: string;

  constructor( public routerLink: ActivatedRoute, public productoService: ProductosService ) {

   }

  ngOnInit() {
    this.routerLink.params.subscribe(parametro => {
      console.log(parametro.id);


      this.productoService.obtenerproducto( parametro.id )
      .subscribe((resp: DetalleProducto) => {
          this.id = parametro.id;
          this.producto = resp;
      });
    });
  }

}
