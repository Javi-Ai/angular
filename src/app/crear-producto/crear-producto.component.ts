import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductosService } from '../services/productos.service';
import Swal from 'sweetalert2';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe,
    CommonModule

  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  formProducto!: FormGroup;

  constructor(private fb: FormBuilder, private productosService: ProductosService) {
    this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    })
  }

  get f() {
    return this.formProducto.controls;
  }



  guardarProducto() {
    if (this.formProducto.invalid) {
      return
    }

    this.productosService.guardarProducto(this.formProducto.value)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'Producto guardado exitosamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al guardar el producto'
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

}
