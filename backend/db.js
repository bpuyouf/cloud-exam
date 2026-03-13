import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const dbServerId = process.env.DB_SERVER_ID;
const dbPassword = process.env.MYSQL_PASSWORD;
if (!dbServerId) {
  throw new Error('DB_SERVER_ID is not set in .env');
}

const dbConfig = {
  host: dbServerId,
  user: 'azureuser',
  password: dbPassword,
  database: 'cloudapp'
};

let pool;

export async function connectDb() {
  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    console.log('✅ Connected to the database');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}

export default pool;