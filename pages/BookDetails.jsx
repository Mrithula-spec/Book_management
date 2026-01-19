import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`)
        setBook(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!book) return <p>Book not found</p>

  return (
    <div className="p-8">
      <img src={book.thumbnail} alt={book.bookName} />
      <h1>{book.bookName}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Pages:</strong> {book.totalPages}</p>
      <p>{book.synopsis}</p>
    </div>
  )
}

export default BookDetails
