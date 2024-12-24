require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// MongoDB Atlas Connection
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number
});
const User = mongoose.model("User", userSchema);

// Routes
// Create User
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read User by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update User
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log("Server is Running on port 3001!");
});
