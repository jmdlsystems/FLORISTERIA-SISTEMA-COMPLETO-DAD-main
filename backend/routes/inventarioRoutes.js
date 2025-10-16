const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventarioController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

// Nueva ruta para obtener inventario por producto
router.get('/producto/:producto_id', controller.getByProducto);

module.exports = router; 