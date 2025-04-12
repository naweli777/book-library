ALTER TABLE "borrowed_books" ALTER COLUMN "returned_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_title_unique" UNIQUE("title");