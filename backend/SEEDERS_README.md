# 🌱 Seeders - Sistema de Floreria

Este directorio contiene los seeders para poblar la base de datos con datos iniciales del sistema de floreria.

## 📋 Seeders Disponibles

### 1. Roles (20240620110000-roles-floreria.js)
Roles del sistema:
- **ADMINISTRADOR**: Acceso completo al sistema
- **REPARTIDOR**: Gestión de entregas
- **FLORISTA**: Gestión de productos e inventario
- **USUARIO**: Acceso limitado para compras

### 2. Usuarios Demo (20240620120000-demo-usuario.js)
Usuarios de prueba con diferentes roles:
- **Administrador**: admin@demo.com / admin123
- **Repartidor**: repartidor@demo.com / usuario123
- **Florista**: florista@demo.com / usuario123
- **Usuario**: usuario@demo.com / usuario123

### 3. Ubicaciones Floreria (20240620130000-ubicaciones-floreria.js)
Ubicaciones típicas de una floreria para el control de inventario:

#### 🌸 Áreas de Refrigeración
- **Refrigerador Principal**: Para flores frescas y arreglos florales
- **Refrigerador Secundario**: Para flores de temporada y stock extra
- **Refrigerador de Rosas**: Especializado para rosas y flores delicadas

#### 🏪 Áreas de Exhibición y Venta
- **Sala de Exhibición**: Área principal para arreglos florales y decoraciones
- **Estantería de Accesorios**: Lazos, cintas, tarjetas y accesorios florales
- **Estantería de Plantas Artificiales**: Plantas artificiales y flores secas

#### 🛠️ Áreas de Trabajo
- **Área de Trabajo**: Mesa para arreglos florales y preparación de pedidos
- **Área de Entrega**: Preparación y organización de entregas a domicilio

#### 📦 Almacenes Especializados
- **Almacén de Macetas**: Macetas, jardineras y contenedores de plantas
- **Almacén de Suelos**: Sustratos, fertilizantes y tierra para macetas
- **Almacén de Herramientas**: Tijeras, alambres, espumas y herramientas

#### 🌿 Áreas de Cultivo
- **Invernadero**: Plantas vivas y flores en maceta

### 4. Categorías (20240620140000-categorias-floreria.js)
Categorías de productos:
- **Rosas**: Rosas de diferentes colores y variedades
- **Tulipanes**: Tulipanes frescos de temporada
- **Girasoles**: Girasoles alegres y vibrantes
- **Lirios**: Lirios elegantes y fragantes
- **Margaritas**: Margaritas blancas y coloridas
- **Orquídeas**: Orquídeas exóticas y elegantes
- **Crisantemos**: Crisantemos de múltiples colores
- **Arreglos Florales**: Arreglos florales combinados
- **Plantas de Interior**: Plantas de interior y macetas
- **Accesorios**: Lazos, tarjetas y accesorios florales

### 5. Proveedores (20240620150000-proveedores-floreria.js)
Proveedores de flores y productos:
- **Flores del Valle**: Proveedor principal de rosas
- **Vivero San Pedro**: Especialista en tulipanes
- **Invernaderos La Esperanza**: Proveedor de girasoles
- **Flores Exóticas del Sur**: Orquídeas y flores exóticas
- **Vivero Los Pinos**: Plantas de interior y suculentas
- **Flores de Importación Premium**: Productos premium
- **Vivero El Paraíso**: Crisantemos y flores de temporada
- **Flores y Plantas Express**: Accesorios y arreglos

### 6. Productos (20240620160000-productos-floreria.js)
15 productos de ejemplo con precios y categorías:
- **Flores individuales**: Rosas, tulipanes, girasoles, lirios, margaritas
- **Arreglos especiales**: Arreglo romántico
- **Plantas**: Planta suculenta
- **Accesorios**: Lazo decorativo

### 7. Inventario (20240620170000-inventario-floreria.js)
Registros de inventario para todos los productos con:
- Cantidades actuales
- Cantidades mínimas
- Ubicaciones asignadas

### 8. Movimientos (20240620180000-movimientos-floreria.js)
Historial de movimientos de inventario:
- Cargas iniciales
- Ventas
- Recepciones de proveedores
- Ajustes por daños

### 9. Ajustes de Inventario (20240620190000-ajustes-inventario-floreria.js)
Registros de ajustes de inventario con:
- Motivos de ajuste
- Cantidades ajustadas
- Usuarios responsables

### 10. Órdenes de Compra (20240620200000-ordenes-compra-floreria.js)
Órdenes de compra de ejemplo con:
- Proveedores asociados
- Usuarios responsables
- Estados de las órdenes
- Fechas de creación

### 11. Detalles de Orden de Compra (20240620210000-detalles-orden-compra-floreria.js)
Detalles de las órdenes de compra con:
- Productos asociados
- Cantidades y precios unitarios
- Relaciones con órdenes de compra

### 12. Pedidos de Clientes (20240620220000-pedidos-floreria.js)
Pedidos de clientes con:
- Información del cliente (nombre, teléfono, dirección, email)
- Estados del pedido (pendiente, en_preparacion, listo, en_camino, entregado, cancelado)
- Detalles de productos solicitados
- Métodos de pago y notas

## 🚀 Cómo Ejecutar los Seeders

### Opción 1: Usando el archivo batch (Windows)
```bash
# Desde el directorio backend
run-seeders.bat
```

### Opción 2: Usando Node.js
```bash
# Desde el directorio backend
node run-seeders.js
```

### Opción 3: Usando Sequelize CLI directamente
```bash
# Ejecutar todos los seeders
npx sequelize-cli db:seed:all

# Ejecutar un seeder específico
npx sequelize-cli db:seed --seed 20240620110000-roles-floreria.js

# Revertir un seeder específico
npx sequelize-cli db:seed:undo --seed 20240620110000-roles-floreria.js

# Revertir todos los seeders
npx sequelize-cli db:seed:undo:all
```

## 📊 Resumen de Datos Creados

Al ejecutar todos los seeders se crean:

- **4 Roles** (Administrador, Repartidor, Florista, Usuario)
- **4 Usuarios demo** con diferentes roles
- **12 Ubicaciones** (refrigeradores, almacenes, áreas de trabajo)
- **10 Categorías** (rosas, tulipanes, girasoles, etc.)
- **8 Proveedores** (floristerías y viveros)
- **15 Productos** (flores, arreglos, accesorios)
- **15 Registros de inventario**
- **10 Movimientos de inventario**
- **12 Ajustes de inventario**
- **8 Órdenes de compra**
- **12 Detalles de orden de compra**
- **6 Pedidos de clientes**

## 🔑 Credenciales de Acceso

- **Administrador**: admin@demo.com / admin123
- **Usuario**: usuario@demo.com / usuario123
- **Florista**: florista@demo.com / usuario123
- **Repartidor**: repartidor@demo.com / usuario123

## 📊 Estructura de Datos

### Roles
```javascript
{
  id: INTEGER (auto-increment),
  nombre: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Usuarios
```javascript
{
  id: INTEGER (auto-increment),
  nombre: STRING,
  correo: STRING (unique),
  contraseña: STRING (hashed),
  rol_id: INTEGER (foreign key),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Ubicaciones
```javascript
{
  id: INTEGER (auto-increment),
  nombre: STRING,
  descripcion: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Categorías
```javascript
{
  id: INTEGER (auto-increment),
  nombre: STRING,
  descripcion: STRING,
  imagen: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Proveedores
```javascript
{
  id: INTEGER (auto-increment),
  nombre: STRING,
  contacto: STRING,
  direccion: STRING,
  telefono: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Productos
```javascript
{
  id: INTEGER (auto-increment),
  nombre: STRING,
  descripcion: STRING,
  precio: DECIMAL(10,2),
  categoria_id: INTEGER (foreign key),
  proveedor_id: INTEGER (foreign key),
  imagen: STRING,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Inventario
```javascript
{
  id: INTEGER (auto-increment),
  producto_id: INTEGER (foreign key),
  ubicacion_id: INTEGER (foreign key),
  cantidad_actual: INTEGER,
  cantidad_minima: INTEGER,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Movimientos
```javascript
{
  id: INTEGER (auto-increment),
  tipo: STRING,
  producto_id: INTEGER (foreign key),
  cantidad: INTEGER,
  fecha: DATE,
  usuario_id: INTEGER (foreign key),
  descripcion: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Ajustes de Inventario
```javascript
{
  id: INTEGER (auto-increment),
  producto_id: INTEGER (foreign key),
  cantidad_ajustada: INTEGER,
  motivo: STRING,
  fecha: DATE,
  usuario_id: INTEGER (foreign key),
  createdAt: DATE,
  updatedAt: DATE
}
```

## 🔄 Revertir Seeders

Si necesitas revertir los seeders:

```bash
# Revertir un seeder específico
npx sequelize-cli db:seed:undo --seed 20240620110000-roles-floreria.js

# Revertir todos los seeders (en orden inverso)
npx sequelize-cli db:seed:undo:all
```

## ⚠️ Notas Importantes

1. **Orden de ejecución**: Los seeders se ejecutan en orden alfabético por nombre de archivo
2. **Dependencias**: Los seeders están diseñados para ejecutarse en el orden correcto
3. **Datos únicos**: Los seeders están diseñados para no duplicar datos
4. **Relaciones**: Los datos están relacionados entre sí (productos con categorías, etc.)
5. **Backup**: Siempre haz backup de tu base de datos antes de ejecutar seeders en producción
6. **Órdenes de compra**: Las órdenes de compra y detalles se deben crear manualmente

## 🎯 Uso en el Sistema

Los datos creados por estos seeders se pueden usar en:

### Roles y Usuarios
- **Autenticación**: Login con diferentes roles
- **Autorización**: Control de acceso por roles
- **Auditoría**: Rastreo de acciones por usuario

### Ubicaciones
- **Inventario**: Asignar productos a ubicaciones específicas
- **Ajustes de Inventario**: Registrar cambios de ubicación
- **Movimientos**: Rastrear movimientos entre ubicaciones
- **Reportes**: Generar reportes por ubicación

### Productos y Categorías
- **Catálogo**: Mostrar productos organizados por categorías
- **Compras**: Selección de productos para el carrito
- **Inventario**: Control de stock por producto

### Proveedores
- **Órdenes de compra**: Asociar productos con proveedores
- **Gestión de proveedores**: Información de contacto y ubicación

### Inventario y Movimientos
- **Control de stock**: Cantidades actuales y mínimas
- **Auditoría**: Historial completo de movimientos
- **Ajustes**: Correcciones de inventario con motivos

## 📝 Personalización

Para agregar más datos, edita los archivos de seeders correspondientes:

- **Roles**: `20240620110000-roles-floreria.js`
- **Usuarios**: `20240620120000-demo-usuario.js`
- **Ubicaciones**: `20240620130000-ubicaciones-floreria.js`
- **Categorías**: `20240620140000-categorias-floreria.js`
- **Proveedores**: `20240620150000-proveedores-floreria.js`
- **Productos**: `20240620160000-productos-floreria.js`
- **Inventario**: `20240620170000-inventario-floreria.js`
- **Movimientos**: `20240620180000-movimientos-floreria.js`
- **Ajustes**: `20240620190000-ajustes-inventario-floreria.js`
- **Órdenes de Compra**: `20240620200000-ordenes-compra-floreria.js`
- **Detalles de Orden**: `20240620210000-detalles-orden-compra-floreria.js` 