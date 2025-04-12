// @ts-nocheck

import { addBook, bookBorrowing, getAllBooks,updateBookCopies } from "../controllers/bookController.js";
import { Router } from "express";

const router = Router();
router.post("/addBook", addBook);
router.get("/getAllBook",getAllBooks )
router.put("/updateBookCopies/:id", updateBookCopies)
router.post("/borrowBook", bookBorrowing)

export default router;
