import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8181;
const DATA_FILE = join(__dirname, 'data', 'users.json');

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Helpers ──────────────────────────────────────────────────────────────────
function readUsers() {
  const raw = readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeUsers(users) {
  writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/users  — list all users
app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET /api/users/:id  — get a single user
app.get('/api/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST /api/users  — create a new user
app.post('/api/users', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = readUsers();

  const newUser = { id: uuidv4(), firstName, lastName, email, phone };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json(newUser);
});

// PUT /api/users/:id  — update a user
app.put('/api/users/:id', (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const users = readUsers();
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  // Prevent duplicate email (excluding the user being edited)
  // const duplicate = users.find((u) => u.email === email && u.id !== req.params.id);
  // if (duplicate) return res.status(409).json({ message: 'Email already in use' });

  users[index] = { ...users[index], firstName, lastName, email, phone };
  writeUsers(users);

  res.json(users[index]);
});

// DELETE /api/users/:id  — delete a user
app.delete('/api/users/:id', (req, res) => {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const [deleted] = users.splice(index, 1);
  writeUsers(users);

  res.json({ message: 'User deleted', user: deleted });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  User Management API running on http://localhost:${PORT}`);
});
