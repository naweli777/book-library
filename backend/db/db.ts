import pkg from "pg";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from '../models/schema.js'; // ✅ Import all tables

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool,{schema});

export default db;
