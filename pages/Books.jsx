import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

function Books() {
  const { id } = useParams()
  const [books, setBooks] = useState([])

  const [bookName, setBookName] = useState("")
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("Fiction")
  const [totalPages, setTotalPages] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [synopsis, setSynopsis] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const res = await api.get(`/booklist/${id}`)
    setBooks(res.data.books)
  }

  const addBook = async () => {
    await api.post(`/booklist/${id}/books`, {
      bookName,
      author,
      genre,
      totalPages: Number(totalPages),
      thumbnail,
      synopsis
    })

    setBookName("")
    setAuthor("")
    setGenre("Fiction")
    setTotalPages("")
    setThumbnail("")
    setSynopsis("")

    fetchBooks()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Books</h2>

      {/* Add Book Form */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <input
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2"
        >
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Self-Help</option>
          <option>Technology</option>
          <option>Biography</option>
          <option>Fantasy</option>
        </select>
        <input
          type="number"
          placeholder="Total Pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="border p-2 col-span-2"
        />
        <textarea
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          className="border p-2 col-span-2"
        />
       
      </div>

      {/* Book List */}
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded">
            <h3 className="font-bold">{book.bookName}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Total Pages: {book.totalPages}</p>
            {book.thumbnail && (
              <img src={book.thumbnail} alt={book.bookName} className="w-32 mt-2" />
            )}
            <p className="mt-2 text-sm">{book.synopsis}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books
