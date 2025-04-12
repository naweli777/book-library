CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"role" "user_role" NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
