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
export const getBooksByBooklist = async (req, res) => {
  try {
    const books = await Book.find({
      booklist: req.params.id,
      user: req.user._id,
    }).populate("booklist", "name")

    const formatted = books.map(book => ({
      ...book.toObject(),
      genre: book.booklist.name
    }))

    res.json(formatted)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
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
  const booklistId = req.params.id
  const userId = req.user._id

  // 1️⃣ Verify booklist belongs to user
  const booklist = await Booklist.findOne({
    _id: booklistId,
    user: userId,
  })

  if (!booklist) {
    return res.status(404).json({ message: "Booklist not found" })
  }

  // 2️⃣ Delete all books under this booklist (USER-SCOPED)
  await Book.deleteMany({
    booklist: booklistId})

  // 3️⃣ Delete the booklist itself
  await Booklist.deleteOne({
    _id: booklistId,
    user: userId,
  })

  res.json({ message: "Booklist and related books deleted" })
}


export const addBook = async (req, res) => {
  const { bookName, author, totalPages, thumbnail, synopsis } = req.body

  if (!bookName || !author || !totalPages) {
    return res.status(400).json({ message: "Missing required fields" })
  }
   const booklist = await Booklist.findOne({
    _id: req.params.id,
    user: req.user._id
  })

  if (!booklist) {
    return res.status(404).json({ message: "Booklist not found" })
  }


  const book = await Book.create({
    bookName,
    author,
    totalPages,
    thumbnail,
    synopsis,
    booklist: req.params.id , // link to Booklist
    user: req.user._id
  })

  res.status(201).json(book)
}

export const deleteBook = async (req, res) => {
  const { bookId } = req.params
  const userId = req.user._id

  const book = await Book.findOneAndDelete({
    _id: bookId,
    user: userId,
  })

  if (!book) {
    return res.status(404).json({ message: "Book not found" })
  }
   await Booklist.updateOne(
    { _id: book.booklist },
    { $pull: { books: bookId } }
  )

  res.json({ message: "Book deleted successfully" })
}

