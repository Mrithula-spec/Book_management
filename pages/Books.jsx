import { useEffect, useState } from "react";
import api from "../api/axios"; // adjust path if needed
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const Books = () => {
  const { user } = useAuth();
  const { id: booklistId } = useParams();

  const [booklists, setBooklists] = useState([]);
  const [selectedBooklist, setSelectedBooklist] = useState(booklistId || "");

  const [books, setBooks] = useState([]);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [synopsis, setSynopsis] = useState("");

  /* ----------------------------------------
     FETCH BOOKLISTS
  ---------------------------------------- */
  useEffect(() => {
    const fetchBooklists = async () => {
      try {
        const res = await api.get("/booklist", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBooklists(res.data);
      } catch (err) {
        console.error("Failed to fetch booklists", err);
      }
    };

    fetchBooklists();
  }, [user.token]);

  /* ----------------------------------------
     FETCH BOOKS FOR SELECTED BOOKLIST
  ---------------------------------------- */
  useEffect(() => {
    if (!selectedBooklist) return;

    const fetchBooks = async () => {
      try {
        const res = await api.get(
          `/booklist/${selectedBooklist}/books`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, [selectedBooklist, user.token]);

  /* ----------------------------------------
     ADD BOOK (NO GENRE HERE)
  ---------------------------------------- */
  const addBook = async () => {
    if (!selectedBooklist) return alert("Select a booklist first");

    try {
      await api.post(
        `/booklist/${selectedBooklist}/books`,
        {
          bookName,
          author,
          totalPages: Number(totalPages),
          thumbnail,
          synopsis,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      // reset fields
      setBookName("");
      setAuthor("");
      setTotalPages("");
      setThumbnail("");
      setSynopsis("");

      // reload books
      const res = await api.get(
        `/booklist/${selectedBooklist}/books`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to add book", err);
    }
  };

  return (
    <div className="books-page">
      <h2>My Books</h2>

      {/* -------------------------------
          SELECT BOOKLIST
      -------------------------------- */}
      <label>Select Booklist</label>
      <select
        value={selectedBooklist}
        onChange={(e) => setSelectedBooklist(e.target.value)}
      >
        <option value="">-- Select --</option>
        {booklists.map((bl) => (
          <option key={bl._id} value={bl._id}>
            {bl.name}
          </option>
        ))}
      </select>

      {/* -------------------------------
          ADD BOOK FORM
      -------------------------------- */}
      <div className="add-book-form">
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Pages"
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
        />

        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <textarea
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />

        <button onClick={addBook}>Add Book</button>
      </div>

      {/* -------------------------------
          BOOK LIST DISPLAY
      -------------------------------- */}
      <div className="books-list">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <h3>{book.bookName}</h3>
            <p>Author: {book.author}</p>
            <p>Booklist: {book.booklist?.name}</p>
            <p>Total Pages: {book.totalPages}</p>

            {book.thumbnail && (
              <img src={book.thumbnail} alt={book.bookName} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
