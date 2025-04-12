import { eq } from "drizzle-orm";
import db from "../db/db.js";
import { Books, TBook } from "../models/schema.js";

export const addBook = async (newBook: TBook) => {
  await db.insert(Books).values(newBook);
};

export const getBooks = async () => {
  return await db.select().from(Books);
};

export const updateBookCopies = async (id: number, totalCopies: number) => {
  if (!id || !totalCopies) {
    throw new Error("Missing book ID or total copies");
  }

  const updatedBook = await db
    .update(Books)
    .set({
      totalCopies,
      availableCopies: totalCopies,
    })
    .where(eq(Books.id, id));

  return updatedBook;
};
