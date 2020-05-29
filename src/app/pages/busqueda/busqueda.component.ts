import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor( private activaterouter: ActivatedRoute, public productoService: ProductosService ) { }

  ngOnInit() {

    this.activaterouter.params.subscribe(parametro => {
      console.log(parametro.termino);

      this.productoService.buscarProducto(parametro.termino);
    })
  }

}
