import { pool } from '../db.js';

export async function getUsers() {
  if (!pool) throw new Error('Database not connected');
  const [rows] = await pool.execute(
    'SELECT id, name, email, created_at FROM users ORDER BY id'
  );
  return rows;
}

export async function addUser({ name, email }) {
  if (!pool) throw new Error('Database not connected');
  const [result] = await pool.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  const [rows] = await pool.execute(
    'SELECT id, name, email, created_at FROM users WHERE id = ?',
    [result.insertId]
  );
  return rows[0];
}