const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Para permitir solicitudes desde tu frontend

// Simulación de base de datos (en un entorno real, esto vendría de tu base de datos)
const users = [
  {
    id: 1,
    username: 'daylinm',
    password: '$2a$10$h1blsOdgDr0f4qko5yz/GePnaMKd/jc8xeMXUlYki/e95S/nMX2By', // Hash de "tuContraseñaEnTextoPlano"
    email: 'daylinmejia24@gmail.com',
    firstName: 'Daylin',
    lastName: 'Mejia',
  },
];

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Busca al usuario en la "base de datos"
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Verifica la contraseña
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    // Inicio de sesión exitoso
    return res.json({ accessToken: 'token', user });
  } else {
    // Inicio de sesión fallido
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
