const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidoController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

// Rutas básicas CRUD
router.get('/', controller.getAll);
router.get('/stats', controller.getStats);
router.get('/estado/:estado', controller.getByEstado);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/estado', controller.updateEstado);
router.delete('/:id', controller.delete);

module.exports = router; 