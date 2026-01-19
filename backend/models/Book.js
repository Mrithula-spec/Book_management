import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: ["Fiction","Non-Fiction","Self-Help","Technology","Biography","Fantasy","Horror"],
      required: true
    },
    totalPages: { type: Number, required: true },
    thumbnail: String,
    synopsis: String,
    booklist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booklist",
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model("Book", bookSchema)
