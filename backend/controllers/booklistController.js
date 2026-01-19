import Booklist from "../models/Booklist.js"
import Book from "../models/Book.js"


export const createBooklist = async (req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400)
    throw new Error("Booklist name required")
  }

  const booklist = await Booklist.create({
    name,
    user: req.user,
  })

  res.status(201).json(booklist)
}

export const getBooklist = async (req, res) => {
   console.log("REQ.USER =", req.user, typeof req.user)
  const lists = await Booklist.find({ user: req.user })
  res.json(lists)
}

// UPDATE booklist name
export const updateBooklist = async (req, res) => {
  try {
    const updated = await Booklist.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name: req.body.name },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: "Booklist not found" })
    }

    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const deleteBooklist = async (req, res) => {
  await Booklist.findByIdAndDelete(req.params.id)
  res.json({ message: "Booklist deleted" })
}
export const addBook = async (req, res) => {
  const { bookName, author, genre, totalPages, thumbnail, synopsis } = req.body

  if (!bookName || !author || !genre || !totalPages) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  const book = await Book.create({
    bookName,
    author,
    genre,
    totalPages,
    thumbnail,
    synopsis,
    booklist: req.params.id  // link to Booklist
  })

  res.status(201).json(book)
}

export const deleteBook = async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.bookId)
  if (!deleted) return res.status(404).json({ message: "Book not found" })
  res.json({ message: "Book deleted" })
}

