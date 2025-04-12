import { addBook } from "../controllers/bookController.js";
import { Router } from "express";

const router = Router();
//@ts-ignore
router.post("/addBook", addBook);

export default router;
