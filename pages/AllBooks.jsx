import { useState, useEffect } from "react";
import api from "../api/axios";

function AllBooks() {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">All Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
             <div
      key={book._id}
      className="bg-white rounded-xl shadow-md p-4 border flex flex-col"
    >
      {/* Thumbnail */}
      {book.thumbnail ? (
        <img
          src={book.thumbnail}
          alt={book.bookName}
          className="w-full h-48 object-cover rounded mb-2"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded mb-2"></div> // fallback
      )}

      {/* Book info */}
      <h3 className="font-semibold text-lg">{book.bookName}</h3>
      <p className="text-gray-600">{book.author}</p>
      <p className="text-gray-500 text-sm">{book.genre}</p>
    </div>
  ))}
</div>
          
    </div>
  );
}

export default AllBooks;
