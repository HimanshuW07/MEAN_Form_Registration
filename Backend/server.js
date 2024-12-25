import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

const __dirname = path.resolve();

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
const User = mongoose.model('User', userSchema);

// Routes
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Serve Static Files
app.use(express.static(path.join(__dirname, '/Frontend/dist/registration-app')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'registration-app', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}!`);
});
