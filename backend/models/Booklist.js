import mongoose from "mongoose"

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: String,
  synopsis: String,
  genre: String,
  totalPages: Number
})

const booklistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    books: [bookSchema]
  },
  { timestamps: true }
)

export default mongoose.model("Booklist", booklistSchema)
