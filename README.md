# 🌸 Sistema de Gestión de Florería

Sistema completo de gestión para una florería con roles de usuario, inventario inteligente, pedidos y auditoría automática. Incluye sistema de rangos de stock, visualización de imágenes y gestión avanzada de inventario.

## 🏗️ Arquitectura

### Backend
- **Express.js** - Servidor API REST
- **Sequelize** - ORM para MySQL
- **JWT** - Autenticación y autorización
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Configuración de acceso

### Frontend
- **React 19** - Interfaz de usuario moderna
- **React Router** - Navegación dinámica
- **Tailwind CSS** - Diseño responsive y moderno
- **Axios** - Cliente HTTP optimizado
- **Context API** - Estado global eficiente

## 🚀 Ejecución del Programa

### Prerrequisitos
- Node.js (v18+)
- MySQL (v8+)
- npm o yarn

### 1. Configuración Inicial

```bash
# Clonar el repositorio
git clone <repository-url>
cd floreria_desarrollo

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### 2. Configuración de Base de Datos

```bash
# Crear base de datos MySQL
CREATE DATABASE practicas_pp_yb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Configurar conexión en backend/config/config.json
{
  "development": {
    "username": "root",
    "password": "tu_password",
    "database": "practicas_pp_yb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### 3. Configuración Completa de la Base de Datos

```bash
cd backend

# Opción 1: Configuración completa desde cero
npm run db:full-setup

# Opción 2: Solo seeders (si ya tienes las tablas)
npm run db:seed-full
```

### 4. Iniciar Servidores

```bash
# Terminal 1: Backend (puerto 3001)
cd backend
npm start

# Terminal 2: Frontend (puerto 4000)
cd frontend
npm start
```

### 5. Acceder al Sistema

- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:3001/api
- **Swagger Documentation**: http://localhost:3001/api-docs

## 🎯 Roles del Sistema

### 👑 ADMINISTRADOR
- Gestión completa del sistema
- Usuarios, roles, productos, categorías
- Proveedores, ubicaciones, órdenes de compra
- Inventario y auditoría completa
- Configuración del sistema

### 🌸 FLORISTA
- **Gestión inteligente de inventario** con rangos de stock
- Preparación de arreglos florales
- Control de pedidos en preparación
- Ajustes de inventario con auditoría
- **Visualización de imágenes** en tamaño completo
- **Sistema de alertas** de stock crítico

### 🚚 REPARTIDOR
- Gestión de entregas
- Actualización de estados de pedidos
- Seguimiento de rutas de entrega

### 👤 USUARIO
- Catálogo de productos con **visualización de imágenes**
- Carrito de compras persistente
- Realización de pedidos
- Seguimiento de pedidos

## 🔐 Credenciales de Acceso

### Usuarios Demo
- **Administrador**: `admin@demo.com` / `admin123`
- **Florista**: `florista@demo.com` / `usuario123`
- **Repartidor**: `repartidor@demo.com` / `usuario123`
- **Usuario**: `usuario@demo.com` / `usuario123`

## 📊 Sistema de Inventario Inteligente

### 🎯 Rangos de Stock Automáticos
El sistema implementa un **sistema inteligente de rangos** que determina automáticamente el estado del inventario:

#### **Estados del Inventario:**
- **🔴 Sin Stock:** Cantidad = 0
- **🔴 Crítico:** Cantidad ≤ (Mínima × 0.5)
- **🟠 Bajo Stock:** (Mínima × 0.5) < Cantidad ≤ Mínima
- **🟡 Stock Moderado:** Mínima < Cantidad ≤ (Mínima × 1.5)
- **🟢 Disponible:** Cantidad > (Mínima × 1.5)

#### **Ejemplo Práctico (Mínima = 15):**
- **0 unidades:** 🔴 Sin Stock
- **7 unidades:** 🔴 Crítico
- **10 unidades:** 🟠 Bajo Stock
- **20 unidades:** 🟡 Stock Moderado
- **25 unidades:** 🟢 Disponible

### 🎨 Visualización de Imágenes
- **Modal de imágenes** con zoom y navegación
- **Vista en tamaño completo** de productos y categorías
- **Controles de zoom** (25% - 300%)
- **Navegación con teclado** (ESC para cerrar)
- **Loading states** y transiciones suaves

## 🔄 Cómo Funciona el Sistema

### 1. Flujo de Autenticación
```
Usuario ingresa credenciales → Backend valida → JWT token → Frontend almacena → Acceso autorizado
```

### 2. Flujo de Gestión de Inventario Inteligente
```
Producto → Inventario con rangos automáticos → Ajustes → Movimientos (automático) → Auditoría completa
```

### 3. Flujo de Pedidos
```
Cliente → Pedido → Florista → Repartidor → Entrega
```

### 4. Flujo de Órdenes de Compra
```
Administrador → Orden de Compra → Proveedor → Inventario
```

### 5. Flujo de Auditoría Automática
```
Cualquier cambio → Movimiento automático → Registro inmutable → Trazabilidad completa
```

## 📊 Estructura de Datos

### Entidades Principales
- **Usuarios** - Gestión de cuentas y roles
- **Productos** - Catálogo de flores y arreglos con imágenes
- **Inventario** - Control de stock con rangos inteligentes
- **Pedidos** - Órdenes de clientes
- **Órdenes de Compra** - Compras a proveedores
- **Categorías** - Clasificación de productos
- **Proveedores** - Gestión de suministros
- **Ubicaciones** - Control de almacenamiento

### Entidades de Auditoría
- **Movimientos** - Registro automático de cambios
- **Ajustes de Inventario** - Modificaciones manuales documentadas

## 🛠️ Comandos Útiles

### Base de Datos
```bash
# Reset completo
npm run db:reset-full

# Solo seeders
npm run db:seed-full

# Configuración limpia
npm run db:clean-setup

# Verificar endpoints
node test_endpoints.js
```

### Desarrollo
```bash
# Backend con nodemon
npm run dev

# Frontend
npm start

# Build de producción
npm run build
```

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# Backend (.env)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=practicas_pp_yb
DB_USER=root
DB_PASS=password
JWT_SECRET=your-secret-key
PORT=3001

# Frontend (.env.local)
REACT_APP_API_URL=http://localhost:3001/api
```

### Personalización
- **Colores**: Modificar `tailwind.config.js`
- **Roles**: Editar seeders de roles
- **Productos**: Modificar seeders de productos
- **Estados**: Personalizar en controladores
- **Rangos de inventario**: Ajustar en componentes de inventario

## 📈 Características Destacadas

### ✅ Implementado
- [x] **Autenticación JWT completa** con expiración automática
- [x] **Roles y permisos** por usuario con redirección inteligente
- [x] **Sistema de inventario inteligente** con rangos automáticos
- [x] **Gestión de pedidos** con estados y seguimiento
- [x] **Carrito de compras persistente** por usuario
- [x] **Dashboard personalizado** por rol
- [x] **API REST completa** con documentación Swagger
- [x] **Interfaz responsive** con Tailwind CSS
- [x] **Validaciones de datos** en frontend y backend
- [x] **Manejo de errores** robusto
- [x] **Seeders con datos demo** realistas
- [x] **Sistema de auditoría automática** completo
- [x] **Visualización de imágenes** con modal y zoom
- [x] **Sistema de alertas** de stock crítico
- [x] **UI/UX mejorada** con consistencia visual

### 🔄 Automatizado
- [x] **Registro de movimientos** de inventario automático
- [x] **Auditoría de ajustes** de inventario inmutable
- [x] **Cálculo automático** de totales y estados
- [x] **Persistencia de carrito** por usuario
- [x] **Redirección basada** en roles
- [x] **Rangos de stock** calculados automáticamente
- [x] **Actualización en tiempo real** de estados

### 🎨 Experiencia de Usuario
- [x] **Modal de imágenes** con controles de zoom
- [x] **Navegación con teclado** (ESC para cerrar modales)
- [x] **Loading states** y transiciones suaves
- [x] **Tooltips informativos** en estados de inventario
- [x] **Interfaz consistente** entre formularios
- [x] **Responsive design** para todos los dispositivos

## 🚨 Notas Importantes

### Seguridad
- Las contraseñas se encriptan con bcrypt
- Los tokens JWT expiran en 24 horas
- Validación de roles en frontend y backend
- Sanitización de datos de entrada
- Auditoría completa de todas las acciones

### Auditoría
- Los movimientos se registran automáticamente
- Los ajustes de inventario no se pueden editar
- Trazabilidad completa de cambios
- Registro de usuario que realiza cada acción
- Historial inmutable de todas las transacciones

### Rendimiento
- Lazy loading de componentes
- Optimización de consultas SQL
- Caché de datos en frontend
- Compresión de respuestas
- Actualización eficiente de estados

## 📁 Estructura del Proyecto

```
floreria_desarrollo/
├── backend/
│   ├── controllers/     # Lógica de negocio
│   ├── models/         # Modelos de datos
│   ├── routes/         # Rutas de API
│   ├── migrations/     # Migraciones de BD
│   ├── seeders/        # Datos iniciales
│   ├── middleware/     # Middleware de autenticación
│   └── services/       # Servicios especializados
├── frontend/
│   ├── src/
│   │   ├── components/ # Componentes React organizados por módulo
│   │   │   ├── Inventario/    # Gestión de inventario inteligente
│   │   │   ├── Productos/     # Catálogo con visualización
│   │   │   ├── Categorias/    # Gestión de categorías
│   │   │   ├── Pedidos/       # Sistema de pedidos
│   │   │   └── Auth/          # Autenticación y autorización
│   │   ├── contexts/   # Contextos globales
│   │   ├── services/   # Servicios de API
│   │   └── App.js      # Aplicación principal
│   └── public/         # Archivos estáticos
└── README.md
```

## 🔍 Funcionalidades Específicas por Rol

### 👑 Administrador
- Gestión completa de usuarios y roles
- Configuración de productos y categorías
- Gestión de proveedores y ubicaciones
- Órdenes de compra y auditoría completa
- Configuración del sistema

### 🌸 Florista
- **Sistema de inventario inteligente** con rangos automáticos
- **Alertas de stock crítico** y recomendaciones
- **Visualización de imágenes** de productos
- Gestión de pedidos en preparación
- Ajustes de inventario con auditoría

### 🚚 Repartidor
- Gestión de entregas y rutas
- Actualización de estados de pedidos
- Seguimiento de entregas en tiempo real

### 👤 Usuario
- Catálogo de productos con **visualización de imágenes**
- Carrito de compras persistente
- Realización y seguimiento de pedidos
- Interfaz intuitiva y responsive

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🆘 Soporte

Para soporte técnico o preguntas:
- Revisar la documentación de la API
- Verificar los logs del servidor
- Comprobar la configuración de la base de datos
- Validar las credenciales de acceso
- Consultar la documentación de rangos de inventario

---

## 👨‍💻 Autor del Proyecto

**Este proyecto fue creado por el Ing. Rodrigo Guerrero Jordy**

### 📧 Información Académica
- **Ingeniero:** Rodrigo Guerrero Jordy
- **Especialidad:** Desarrollo de Aplicaciones Distribuidas
- **Universidad:** USS (Universidad Señor de Sipán)
- **Ciclo:** 9

---

**Desarrollado con ❤️ para la gestión eficiente y moderna de floristerías**

### 🌟 Características Únicas
- **Sistema de rangos inteligente** para gestión de inventario
- **Auditoría automática completa** con trazabilidad
- **Visualización avanzada de imágenes** con zoom
- **UI/UX moderna** con Tailwind CSS
- **Sistema de alertas** proactivo para stock crítico 