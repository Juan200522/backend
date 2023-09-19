const jwt = require('jsonwebtoken');


const users = [];

const generateAuthToken = (userInfo) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = '1h';

  if (!secretKey) {
    throw new Error('El secreto JWT no está configurado en la variable de entorno.');
  }

  const token = jwt.sign(userInfo, secretKey, { expiresIn });

  return token;
};

const register = (req, res) => {
    const { username, email, password } = req.body;

    // Verificar que no haya campos vacíos
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  
    // Verificar si el usuario ya existe (puedes usar users.find() aquí)
    const existingUser = users.find((user) => user.email === email);

  const newUser = { id: Date.now().toString(), username, email, password };
  users.push(newUser);

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = generateAuthToken({ id: user.id, username: user.username, email: user.email, name: user.name });

  return res.status(201).json({ user: { id: newUser.id, username: newUser.username, email: newUser.email }, token });
};

const login = (req, res) => {
    const { email, password } = req.body;

    // Verificar que no haya campos vacíos
    if (!email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  
    // Verificar si el usuario existe (puedes usar users.find() aquí)
    const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  const token = generateAuthToken({ id: user.id, username: user.username, email: user.email });

  return res.status(200).json({ user: { id: user.id, username: user.username, email: user.email }, token });
};

module.exports = {
  register,
  login,
};
