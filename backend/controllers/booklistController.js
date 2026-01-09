import Booklist from "../models/Booklist.js"

export const createBooklist = async (req, res) => {
  const { name } = req.body

  if (!name) {
    res.status(400)
    throw new Error("Booklist name required")
  }

  const booklist = await Booklist.create({
    name,
    user: req.user,
    books: []
  })

  res.status(201).json(booklist)
}

export const getBooklists = async (req, res) => {
   console.log("REQ.USER =", req.user, typeof req.user)
  const lists = await Booklist.find({ user: req.user._id })
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
  const booklist = await Booklist.findById(req.params.id)
  booklist.books.push(req.body)
  await booklist.save()
  res.json(booklist)
}

export const deleteBook = async (req, res) => {
  const booklist = await Booklist.findById(req.params.id)
  booklist.books = booklist.books.filter(
    (book) => book._id.toString() !== req.params.bookId
  )
  await booklist.save()
  res.json(booklist)
}
