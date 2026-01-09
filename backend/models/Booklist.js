import mongoose from "mongoose"
const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: ["Fiction","Non-Fiction","Self-Help","Technology","Biography","Fantasy"], required: true },
  totalPages: { type: Number, required: true },
  thumbnail: String,
  synopsis: String
});

const booklistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [bookSchema]
}, { timestamps: true });

export default mongoose.model("Booklist", booklistSchema);

