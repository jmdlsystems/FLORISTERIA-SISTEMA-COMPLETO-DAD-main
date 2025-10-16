const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');
const { verifyToken } = require('../middleware/auth');

// Registro y login quedan públicos (si existieran aquí)
// Todas las demás rutas requieren autenticación JWT
router.use(verifyToken);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router; 