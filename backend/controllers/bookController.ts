import { TBook, TBorrowedBooks } from "../models/schema.js";
import type { Request, Response } from "express";
import * as bookService from "../service/bookService.js";

export const addBook = async (req: Request<{}, {}, TBook>, res: Response) => {
  try {
    const { author, title, totalCopies } = req.body;

    if (!author || !title || !totalCopies) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBook = {
      author,
      title,
      totalCopies,
      availableCopies: totalCopies,
    };
    await bookService.addBook(newBook);
    return res.status(200).json({ message: "Book Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Server Error" });
  }
};

export const getAllBooks = async (
  req: Request<{}, {}, TBook>,
  res: Response
) => {
  try {
    const books = await bookService.getBooks();
    return res
      .status(200)
      .json({ books, message: "Books fetched successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Server Error" });
  }
};

export const updateBookCopies = async (req: Request<TBook>, res: Response) => {
  try {
    const bookId = req.params?.id;
    const {totalCopies} = req.body;

    if (!bookId || !totalCopies) {
      return res
        .status(400)
        .json({ error: "Book ID and totalCopies required" });
    }

    await bookService.updateBookCopies(bookId, totalCopies);
    return res.status(200).json({ message: "Book Updated Successfully" });
  } catch (error) {
    console.error("UpdateBook Error:", (error as Error).message);
    return res.status(500).json({ error: "Failed to update book" });
  }
};


export const bookBorrowing = async (req:Request<TBorrowedBooks>, res:Response)=>{
  try{
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: "userId and bookId required" });
    }

    const result = await bookService.borrowedBooks(userId, bookId);
    return res.status(200).json(result);
  }catch(error){
    console.error("BorrowBook Error:", (error as Error).message);
    return res.status(500).json({ error: "Failed to borrow book" });
  }
}