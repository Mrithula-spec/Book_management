import express from "express"
import protect from "../middleware/authMiddleware.js"
import {
  createBooklist,
  getBooklist,
  deleteBooklist,
  addBook,
  deleteBook,
  updateBooklist
} from "../controllers/booklistController.js"
const router = express.Router()
router.post("/", protect, createBooklist)
router.get("/", protect, getBooklist)
router.delete("/:id", protect, deleteBooklist)
router.put("/:id", protect, updateBooklist)
router.post("/:id/books", protect, addBook)
router.delete("/:id/books/:bookId", protect, deleteBook)

export default router
