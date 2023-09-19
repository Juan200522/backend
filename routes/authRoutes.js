const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware'); // Importa el middleware

// Ruta para el registro de nuevos usuarios
router.post('/register', authController.register);

// Ruta para el login de usuarios existentes
router.post('/login', authController.login);

// Ruta protegida: Ejemplo de uso del middleware para autenticación
router.get('/protected', authenticateToken, (req, res) => {
  // La ruta solo será accesible si el usuario está autenticado
  // Accede a la información del usuario desde req.user
  res.json({ message: 'Ruta protegida accesible para usuario autenticado.', user: req.user });
});

// Otras rutas públicas y protegidas aquí

module.exports = router;

