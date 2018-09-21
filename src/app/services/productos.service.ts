import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable()
export class ProductosService {

    cargando = true;
    productos: Producto[] = [];
    productosFiltrado: Producto[] = [];

    constructor(private http: HttpClient) {
        this.cargarProductos();
    }

    private cargarProductos() {

        return new Promise((resolve, reject) => {
            this.http.get('https://angular-html-cb8b9.firebaseio.com/productos_idx.json')
                .subscribe((resp: Producto[]) => {
                    console.log(resp);
                    this.productos = resp;
                    // setTimeout(() => {
                    this.cargando = false;
                    // }, 1000);
                    resolve();
                });
        });

    }

    getProducto(id: String) {
        return this.http.get(`https://angular-html-cb8b9.firebaseio.com/productos/${id}.json`)
    }

    buscarProducto(termino: String) {

        if (this.productos.length === 0) {
            //Cargar los productos
            this.cargarProductos().then(() => {
                //Despues de cargar los productos
                this.filtrarProductos(termino);
            })
        } else {
            this.filtrarProductos(termino);
        }

    }

    private filtrarProductos(termino: string) {
        console.log(this.productos);
        this.productosFiltrado = [];

        termino = termino.toLocaleLowerCase();

        this.productos.forEach(prod => {
            const tituloLower = prod.titulo.toLocaleLowerCase();

            if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
                this.productosFiltrado.push(prod);
            }
        });
    }

}
