import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../interfaces/producto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  @Input('id') idProducto!: string
  infoProducto!: Producto
  formProducto!: FormGroup

  constructor(private productosService: ProductosService, private fb: FormBuilder) {
    this.formProducto = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      imagen: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.obtenerProductoPorId()
  }

  get controls() {
    return this.formProducto.controls
  }

  obtenerProductoPorId() {
    this.productosService.obtenerProductoPorId(this.idProducto)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            this.formProducto.patchValue({
              id: value.producto.id,
              nombre: value.producto.nombre,
              descripcion: value.producto.descripcion,
              precio: value.producto.precio,
            })
          }
        }, error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          })
        }
      })
  }

  onFileSelected(event: any): void {
    this.formProducto.patchValue({
      imagen: event.target.files[0]

    });
  }

  actualizarProducto() {
    if (this.formProducto.invalid) {
      return
    }
    this.productosService.actualizarProducto(this.formProducto.value)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'Producto actualizado exitosamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al actualizar producto'
            })
          }
        }, error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          })
        }
      })
  }
}
