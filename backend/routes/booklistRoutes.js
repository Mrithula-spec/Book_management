import express from "express"
import protect from "../middleware/authMiddleware.js"
import Book from "../models/Book.js"
import {
  createBooklist,
  getBooklist,
  deleteBooklist,
  addBook,
  deleteBook,
  updateBooklist
} from "../controllers/booklistController.js"

const router = express.Router()

// ---------- BOOKLIST CRUD ----------
router.post("/", protect, createBooklist)
router.get("/", protect, getBooklist)



router.get("/:id/books", protect, async (req, res) => {
  try {
    const books = await Book.find({
      booklist: req.params.id,
      user: req.user._id
    }).populate("booklist", "name")

    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/:id/books", protect, addBook)
router.delete("/:id/books/:bookId", protect, deleteBook)

// ---------- BOOKLIST CRUD BY ID ----------
router.put("/:id", protect, updateBooklist)
router.delete("/:id", protect, deleteBooklist)

export default router
