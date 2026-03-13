#!/usr/bin/env node

import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load .env from backend directory if present
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const dbServerId = process.env.DB_SERVER_ID;
if (!dbServerId) {
  console.error('ERROR: DB_SERVER_ID is not set in .env');
  process.exit(1);
}

const adminPassword = process.env.MYSQL_ADMIN_PASSWORD || 'password';

const dbConfig = {
  host: dbServerId,
  user: 'root',
  password: adminPassword,
};

async function ensureDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute('CREATE DATABASE IF NOT EXISTS cloudapp');
    console.log('Database cloudapp created or already exists.');
  } finally {
    await connection.end();
  }
}

async function run() {
  // Fail fast if the script takes too long
  const timeoutMs = 20000;
  const timeout = setTimeout(() => {
    console.error(`ERROR: init-db.js timed out after ${timeoutMs}ms`);
    process.exit(1);
  }, timeoutMs);

  try {
    console.log('Connecting to MySQL server...');
    await ensureDatabase();

    console.log('Creating required tables...');

    // Connect to target database
    const targetConfig = { ...dbConfig, database: 'cloudapp' };
    const targetConnection = await mysql.createConnection(targetConfig);

    try {
      await targetConnection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log('✅ Database and tables are ready.');
    } finally {
      await targetConnection.end();
    }

    clearTimeout(timeout);
    process.exit(0);
  } catch (error) {
    console.error('ERROR:', error.message || error);
    process.exit(1);
  }
}

run();