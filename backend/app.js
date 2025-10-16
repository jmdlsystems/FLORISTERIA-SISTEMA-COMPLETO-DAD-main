const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Leer el archivo swagger.json directamente
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'));

// Servir documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Importar rutas
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/ubicaciones', require('./routes/ubicacionRoutes'));
app.use('/api/inventarios', require('./routes/inventarioRoutes'));
app.use('/api/movimientos', require('./routes/movimientoRoutes'));
app.use('/api/ordenes_compra', require('./routes/orden_compraRoutes'));
app.use('/api/detalles_orden_compra', require('./routes/detalle_orden_compraRoutes'));
app.use('/api/ajustes_inventario', require('./routes/ajuste_inventarioRoutes'));
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/roles', require('./routes/rolRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));

app.get('/', (req, res) => {
  res.send('API Florería en funcionamiento');
});

// Endpoint para obtener la especificación Swagger en JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en: http://localhost:${PORT}/api-docs`);
}); 