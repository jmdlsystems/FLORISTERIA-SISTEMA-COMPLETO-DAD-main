const express = require('express');
const router = express.Router();
const controller = require('../controllers/movimientoController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

// Nuevas rutas para consultas específicas
router.get('/producto/:producto_id', controller.getByProducto);
router.get('/tipo/:tipo', controller.getByTipo);

module.exports = router; 