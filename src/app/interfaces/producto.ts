export interface ResponseProducto {
    estado: number;
    productos: Producto[]
}
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    imagen: string;
}

export interface ResponseProductoId {
    estado: number;
    producto: Producto;
}

export interface ResponseStatusProducto {
    estado: number;
    mensaje: string;
}