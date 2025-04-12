// @ts-nocheck

import { addBook, getAllBooks } from "../controllers/bookController.js";
import { Router } from "express";

const router = Router();
router.post("/addBook", addBook);
router.get("/getAllBook",getAllBooks )

export default router;
