import {
  pgTable,
  serial,
  text,
  varchar,
  pgEnum,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

const timestamps = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
};

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  role: userRoleEnum("role").notNull().default("user"),
  ...timestamp,
});

export const Books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").unique(),
  author: text("author"),
  totalCopies: integer("total_copies").notNull(),
  availableCopies: integer("available_copies").notNull(),
  ...timestamps,
});

export const BorrowedBooks = pgTable("borrowed_books", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => User.id)
    .notNull(),
  bookId: integer("book_id")
    .references(() => Books.id)
    .notNull(),
  borrowedAt: timestamp("borrowed_at").defaultNow().notNull(),
  returnedAt: timestamp("returned_at").notNull(),
});

export type TBook = typeof Books.$inferInsert;
export type TBorrowedBooks = typeof BorrowedBooks.$inferInsert;
export type TUser = typeof User.$inferInsert;
