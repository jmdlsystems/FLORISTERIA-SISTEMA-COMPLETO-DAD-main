const express = require('express');
const router = express.Router();
const controller = require('../controllers/ajuste_inventarioController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

// Nuevas rutas para auditoría
router.get('/historial-movimientos/:producto_id', controller.getHistorialMovimientos);
router.get('/estado-inventario', controller.getEstadoInventario);

module.exports = router; 