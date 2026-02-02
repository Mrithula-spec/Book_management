import { useState, useEffect } from "react";
import api from "../api/axios";

function AllBooks() {
  const [books, setBooks] = useState([]);

  // Fetch all books on component mount
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch all books", err);
      }
    };

    fetchAllBooks();
  }, []);

  // Delete book handler
  const deleteBook = async (bookId) => {
    try {
      await api.delete(`/books/${bookId}`); // Call backend DELETE API
      // Remove book from UI
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Books</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md p-4 border flex flex-col relative"
            >
              {/* Thumbnail */}
              {book.thumbnail ? (
                <img
                  src={`http://localhost:5000${book.thumbnail}`}
                  alt={book.bookName}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded mb-2"></div>
              )}

              {/* Book Info */}
              <h3 className="font-semibold text-lg">{book.bookName}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-500 text-sm">{book.booklist?.name}</p>

              {/* Delete Button */}
              <span
                onClick={() => deleteBook(book._id)}
                className="absolute top-2 right-2 text-red-600 font-bold cursor-pointer hover:scale-110"
                title="Delete book"
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBooks;
