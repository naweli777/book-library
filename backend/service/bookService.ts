import { eq, and, isNull } from "drizzle-orm";
import db from "../db/db.js";
import {
  Books,
  BorrowedBooks,
  TBook,
  TBorrowedBooks,
} from "../models/schema.js";
import { date } from "drizzle-orm/pg-core";

//adding book by admin
export const addBook = async (newBook: TBook) => {
  await db.insert(Books).values(newBook);
};
//ends

//get all book by user and admin
export const getBooks = async () => {
  return await db.select().from(Books);
};
//ends

//updating copies of book by admin
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
//ends here

//borrowing of book by user
export const borrowedBooks = async (userId: number, bookId: number) => {
  const book = await db.query.Books.findFirst({
    where: eq(Books.id, bookId),
  });

  if (!book || !book.availableCopies) {
    throw new Error("Book not available");
  }

  const activeBorrows = await db
    .select()
    .from(BorrowedBooks)
    .where(
      and(eq(BorrowedBooks.userId, userId), isNull(BorrowedBooks.returnedAt))
    );

  if (activeBorrows.length >= 2) {
    throw new Error("Borrow limit exceeded");
  }

  const alreadyBorrowedBooks = activeBorrows.find((b) => b.bookId === bookId);
  if (alreadyBorrowedBooks) {
    throw new Error("You have already borrowed this book");
  }

  await db.insert(BorrowedBooks).values({
    bookId,
    userId,
    borrowedAt: new Date(),
    returnedAt: new Date(),
  });

  await db
    .update(Books)
    .set({ availableCopies: book.availableCopies - 1 })
    .where(eq(Books.id, bookId));

  return { message: "Book borrowed successfully" };
};
//ends here 
