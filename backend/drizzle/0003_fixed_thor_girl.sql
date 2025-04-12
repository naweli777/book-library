CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"author" text,
	"totalCopies" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "borrowed_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"borrowed_at" timestamp DEFAULT now() NOT NULL,
	"returned_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;