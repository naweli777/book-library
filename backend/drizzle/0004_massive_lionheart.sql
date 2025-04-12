ALTER TABLE "books" RENAME COLUMN "totalCopies" TO "total_copies";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "available_copies" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;