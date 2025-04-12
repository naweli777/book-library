CREATE TYPE "public"."user_role" AS ENUM('admin', 'user');--> statement-breakpoint
DROP TABLE "user" CASCADE;