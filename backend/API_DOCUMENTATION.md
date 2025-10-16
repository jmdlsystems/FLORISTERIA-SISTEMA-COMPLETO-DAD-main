# API Florería - Documentación

## Base URL
```
http://localhost:3001/api
```

## Autenticación

### POST `/auth/register`
Registra un nuevo usuario.

**Body:**
```json
{
  "correo": "string (requerido)",
  "contraseña": "string (requerido)",
  "nombre": "string (requerido)",
  "rol_id": "integer (opcional)"
}
```

### POST `/auth/login`
Inicia sesión y devuelve un token JWT.

**Body:**
```json
{
  "correo": "string (requerido)",
  "contraseña": "string (requerido)"
}
```

### GET `/auth/verify`
Verifica la validez del token JWT.

**Headers:**
```
Authorization: Bearer <token>
```

## Usuarios

> Todas las rutas requieren autenticación (JWT).

- **GET** `/usuarios` - Lista todos los usuarios.
- **GET** `/usuarios/:id` - Obtiene un usuario por ID.
- **POST** `/usuarios` - Crea un usuario.
- **PUT** `/usuarios/:id` - Actualiza un usuario.
- **PATCH** `/usuarios/:id` - Actualiza parcialmente un usuario.
- **DELETE** `/usuarios/:id` - Elimina un usuario.

**POST/PUT Body:**
```json
{
  "correo": "string (requerido, único)",
  "contraseña": "string (requerido solo en POST)",
  "nombre": "string (requerido)",
  "rol_id": "integer (opcional)"
}
```

## Roles

- **GET** `/roles` - Lista todos los roles.
- **GET** `/roles/:id` - Obtiene un rol por ID.
- **POST** `/roles` - Crea un rol.
- **PUT** `/roles/:id` - Actualiza un rol.
- **PATCH** `/roles/:id` - Actualiza parcialmente un rol.
- **DELETE** `/roles/:id` - Elimina un rol.

**POST/PUT Body:**
```json
{
  "nombre": "string (requerido)"
}
```

## Proveedores

> Todas las rutas requieren autenticación (JWT).

- **GET** `/proveedores` - Lista todos los proveedores.
- **GET** `/proveedores/:id` - Obtiene un proveedor por ID.
- **POST** `/proveedores` - Crea un proveedor.
- **PUT** `/proveedores/:id` - Actualiza un proveedor.
- **PATCH** `/proveedores/:id` - Actualiza parcialmente un proveedor.
- **DELETE** `/proveedores/:id` - Elimina un proveedor.

**POST/PUT Body:**
```json
{
  "nombre": "string (requerido)",
  "contacto": "string (opcional)",
  "direccion": "string (opcional)",
  "telefono": "string (opcional)"
}
```

## Categorías

> Todas las rutas requieren autenticación (JWT).

- **GET** `/categorias` - Lista todas las categorías.
- **GET** `/categorias/:id` - Obtiene una categoría por ID.
- **POST** `/categorias` - Crea una categoría.
- **PUT** `/categorias/:id` - Actualiza una categoría.
- **PATCH** `/categorias/:id` - Actualiza parcialmente una categoría.
- **DELETE** `/categorias/:id` - Elimina una categoría.

**POST/PUT Body:**
```json
{
  "nombre": "string (requerido)",
  "descripcion": "string (opcional)",
  "imagen": "string (opcional, nombre de archivo)"
}
```

## Productos

> Todas las rutas requieren autenticación (JWT).

- **GET** `/productos` - Lista todos los productos.
- **GET** `/productos/:id` - Obtiene un producto por ID.
- **POST** `/productos` - Crea un producto.
- **PUT** `/productos/:id` - Actualiza un producto.
- **PATCH** `/productos/:id` - Actualiza parcialmente un producto.
- **DELETE** `/productos/:id` - Elimina un producto.

**POST/PUT Body:**
```json
{
  "nombre": "string (requerido)",
  "descripcion": "string (opcional)",
  "precio": "float (requerido)",
  "categoria_id": "integer (requerido)",
  "proveedor_id": "integer (opcional)",
  "imagen": "string (opcional, nombre de archivo)"
}
```

## Inventarios

> Todas las rutas requieren autenticación (JWT).

- **GET** `/inventarios` - Lista todos los inventarios.
- **GET** `/inventarios/:id` - Obtiene un inventario por ID.
- **POST** `/inventarios` - Crea un inventario.
- **PUT** `/inventarios/:id` - Actualiza un inventario.
- **PATCH** `/inventarios/:id` - Actualiza parcialmente un inventario.
- **DELETE** `/inventarios/:id` - Elimina un inventario.

**POST/PUT Body:**
```json
{
  "producto_id": "integer (requerido)",
  "cantidad_actual": "integer (requerido)",
  "ubicacion_id": "integer (requerido)"
}
```

## Movimientos

> Todas las rutas requieren autenticación (JWT).

- **GET** `/movimientos` - Lista todos los movimientos.
- **GET** `/movimientos/:id` - Obtiene un movimiento por ID.
- **POST** `/movimientos` - Crea un movimiento.
- **PUT** `/movimientos/:id` - Actualiza un movimiento.
- **PATCH** `/movimientos/:id` - Actualiza parcialmente un movimiento.
- **DELETE** `/movimientos/:id` - Elimina un movimiento.

**POST/PUT Body:**
```json
{
  "tipo": "string (requerido)",
  "producto_id": "integer (requerido)",
  "cantidad": "integer (requerido)",
  "fecha": "string (fecha, opcional)",
  "usuario_id": "integer (requerido)"
}
```

## Ajustes de Inventario

> Todas las rutas requieren autenticación (JWT).

- **GET** `/ajustes_inventario` - Lista todos los ajustes de inventario.
- **GET** `/ajustes_inventario/:id` - Obtiene un ajuste de inventario por ID.
- **POST** `/ajustes_inventario` - Crea un ajuste de inventario.
- **PUT** `/ajustes_inventario/:id` - Actualiza un ajuste de inventario.
- **PATCH** `/ajustes_inventario/:id` - Actualiza parcialmente un ajuste de inventario.
- **DELETE** `/ajustes_inventario/:id` - Elimina un ajuste de inventario.

**POST/PUT Body:**
```json
{
  "producto_id": "integer (requerido)",
  "cantidad_ajustada": "integer (requerido)",
  "motivo": "string (opcional)",
  "fecha": "string (fecha, opcional)",
  "usuario_id": "integer (requerido)"
}
```

## Detalles de Orden de Compra

> Todas las rutas requieren autenticación (JWT).

- **GET** `/detalles_ordenes_compras` - Lista todos los detalles de orden de compra.
- **GET** `/detalles_ordenes_compras/:id` - Obtiene un detalle de orden de compra por ID.
- **POST** `/detalles_ordenes_compras` - Crea un detalle de orden de compra.
- **PUT** `/detalles_ordenes_compras/:id` - Actualiza un detalle de orden de compra.
- **PATCH** `/detalles_ordenes_compras/:id` - Actualiza parcialmente un detalle de orden de compra.
- **DELETE** `/detalles_ordenes_compras/:id` - Elimina un detalle de orden de compra.

**POST/PUT Body:**
```json
{
  "orden_compra_id": "integer (requerido)",
  "producto_id": "integer (requerido)",
  "cantidad": "integer (requerido)",
  "precio_unitario": "float (requerido)"
}
```

## Órdenes de Compra

> Todas las rutas requieren autenticación (JWT).

- **GET** `/ordenes_compra` - Lista todas las órdenes de compra.
- **GET** `/ordenes_compra/:id` - Obtiene una orden de compra por ID.
- **POST** `/ordenes_compra` - Crea una orden de compra.
- **PUT** `/ordenes_compra/:id` - Actualiza una orden de compra.
- **PATCH** `/ordenes_compra/:id` - Actualiza parcialmente una orden de compra.
- **DELETE** `/ordenes_compra/:id` - Elimina una orden de compra.

**POST/PUT Body:**
```json
{
  "proveedor_id": "integer (opcional, debe existir)",
  "fecha": "string (fecha, opcional)",
  "estado": "string (opcional)",
  "usuario_id": "integer (opcional, debe existir)"
}
```

## Ubicaciones

> Todas las rutas requieren autenticación (JWT).

- **GET** `/ubicaciones` - Lista todas las ubicaciones.
- **GET** `/ubicaciones/:id` - Obtiene una ubicación por ID.
- **POST** `/ubicaciones` - Crea una ubicación.
- **PUT** `/ubicaciones/:id` - Actualiza una ubicación.
- **PATCH** `/ubicaciones/:id` - Actualiza parcialmente una ubicación.
- **DELETE** `/ubicaciones/:id` - Elimina una ubicación.

**POST/PUT Body:**
```json
{
  "nombre": "string (requerido)",
  "descripcion": "string (opcional)"
}
```

## Códigos de Error Comunes

- **400** - Bad Request (datos inválidos o faltantes)
- **401** - Unauthorized (credenciales inválidas o token faltante)
- **403** - Forbidden (token inválido)
- **404** - Not Found (recurso no encontrado)
- **500** - Internal Server Error (error del servidor)

## Notas Importantes

1. **Campos en español**: Todos los campos de usuario usan nombres en español:
   - `correo` (no `email`)
   - `contraseña` (no `password`)
   - `nombre` (no `name`)

2. **Seguridad**: Las contraseñas nunca se devuelven en las respuestas de la API.

3. **Tokens JWT**: Los tokens expiran en 24 horas.

4. **Validaciones**: Todos los endpoints incluyen validaciones básicas de datos requeridos.

5. **Roles**: El `rol_id` es opcional en el registro, por defecto se asigna el rol 1.

¿Necesitas la documentación de otro recurso? Pídelo y lo agrego. 