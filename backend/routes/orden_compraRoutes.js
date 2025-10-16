const express = require('express');
const router = express.Router();
const controller = require('../controllers/orden_compraController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router; 