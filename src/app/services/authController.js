const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(bodyParser.json());
app.use(cors());

const users = [
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
  const { username, password, email, firstName, lastName } = req.body;

  const userExists = users.find(
    (u) => u.username === username || u.email === email
  );

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

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

  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", { username, password });

  const user = users.find((u) => u.username === username);

  if (!user) {
    console.log("User not found:", username);
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("Password mismatch:", password, user.password);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ accessToken: "token", user });
});

app.get("/users", (req, res) => {
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});