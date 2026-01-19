import express from "express"
import Book from "../models/Book.js"
import Booklist from "../models/Booklist.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

// GET all books (protected)
router.get("/", protect, async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.get("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CREATE one book (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { bookName, author, genre, totalPages,thumbnail,
      synopsis,booklist } = req.body

    if (!bookName || !author || !genre || !totalPages) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const book = await Book.create({
      bookName,
      author,
      genre,
      totalPages,
      thumbnail,
      synopsis,
      booklist,
      user: req.user._id
    })

    res.status(201).json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
