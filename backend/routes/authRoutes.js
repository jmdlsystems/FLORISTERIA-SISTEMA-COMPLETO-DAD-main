const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/restore', controller.restore);

// Ruta protegida de ejemplo
router.get('/verify', controller.verifyToken, (req, res) => {
  res.json({ message: 'Token válido', user: req.user });
});

module.exports = router; 