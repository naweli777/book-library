import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./models/schema.ts",
  out: "./drizzle", // optional: where to output migrations
  dbCredentials: {
    url: process.env.DATABASE_URL!, // assumes you've defined this in your .env file
  },
});
