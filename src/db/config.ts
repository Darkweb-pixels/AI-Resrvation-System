import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'voice_assistant',
  password: process.env.DB_PASSWORD || 'Admin',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool; 