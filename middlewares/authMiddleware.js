const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Asegúrate de tener esta variable de entorno configurada

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Acceso no autorizado. Token inválido.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
