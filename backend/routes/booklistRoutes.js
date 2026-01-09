import express from "express"
import protect from "../middleware/authMiddleware.js"
import {
  createBooklist,
  getBooklists,
  deleteBooklist,
  addBook,
  deleteBook,
  updateBooklist
} from "../controllers/booklistController.js"
const router = express.Router()
router.post("/", protect, createBooklist)
router.get("/", protect, getBooklists)
router.delete("/:id", protect, deleteBooklist)
router.put("/:id", protect, updateBooklist)
router.post("/:id/books", protect, addBook)
router.delete("/:id/books/:bookId", protect, deleteBook)

export default router
