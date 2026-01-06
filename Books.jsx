import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

function Books() {
  const { id } = useParams()
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const res = await api.get(`/booklists/${id}`)
    setBooks(res.data.books)
  }

  const addBook = async () => {
    await api.post(`/booklists/${id}/books`, { title })
    setTitle("")
    fetchBooks()
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Books</h2>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Book name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <button onClick={addBook} className="bg-blue-600 text-white px-4">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book._id} className="border p-2 rounded">
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Books
