const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de datos simulada
let users = [
  {
    id: 1,
    username: "daylinm",
    password: "$2a$10$h1blsOdgDr0f4qko5yz/GePnaMKd/jc8xeMXUlYki/e95S/nMX2By",
    email: "daylinmejia24@gmail.com",
    firstName: "Daylin",
    lastName: "Mejia",
  },
];

app.post("/register", async (req, res) => {
  console.log("Registro:", req.body);
  const { username, password, email, firstName, lastName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
  };
  users.push(newUser);
  fs.writeFileSync("db.json", JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

app.post("/login", async (req, res) => {
  console.log("Inicio de sesión:", req.body);
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return res.json({ accessToken: "token", user });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
