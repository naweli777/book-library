import db from "../db/db.js";
import { Books, TBook } from "../models/schema.js";

export const addBook = async (newBook: TBook) => {
  await db.insert(Books).values(newBook);
};
