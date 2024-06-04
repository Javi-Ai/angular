import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto, ResponseProducto, ResponseProductoId, ResponseStatusProducto } from '../interfaces/producto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly endpoint = environment.api_url;
  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<ResponseProducto> {
    return this.http.get<ResponseProducto>(`${this.endpoint}productos/listar`)

  }

  guardarProducto(data: Producto) {
    const formData = new FormData();
    formData.append('imagen', data.imagen);
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio);

    return this.http.post(`${this.endpoint}productos/crear`, formData)
  }

  obtenerProductoPorId(id: string): Observable<ResponseProductoId> {
    return this.http.get<ResponseProductoId>(`${this.endpoint}productos/detalle/${id}`)
  }

  actualizarProducto(data: Producto) {
    const formData = new FormData();
    formData.append('imagen', data.imagen);
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio);

    return this.http.put(`${this.endpoint}productos/actualizar/${data.id}`, formData)
  }

  eliminarProducto(id: string) {
    return this.http.delete<ResponseStatusProducto>(`${this.endpoint}productos/eliminar/${id}`)
  }
}
