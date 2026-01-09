import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../api/axios"
function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { user } = useContext(AuthContext)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!user) return;

    const fetchBooks = async () => {
      try {
        const res = await api.get("/books",)
        setBooks(res.data);

        
      } catch (error) {
        console.error("Failed to fetch books", error)
      }
    }

    fetchBooks()
  }, [user])
  const filteredBooks =
  selectedCategory === "All"
    ? books
    : books.filter(
        (book) => book.genre=== selectedCategory
      )
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Discover, Organize & Manage Your Books
            </h1>
            <p className="text-lg text-indigo-100 mb-8">
              Create personalized booklists, track your favorite reads, and manage your collection effortlessly.
            </p>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center shadow-lg">
              <p className="text-xl font-semibold">
                “A smart way to manage all your reading in one place.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
  "All",
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Technology",
  "Self-Help",
  "Biography",
].map((cat) => (
  <div
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`cursor-pointer rounded-2xl border p-6 text-center transition
      ${
        selectedCategory === cat
          ? "bg-indigo-600 text-white shadow-lg"
          : "bg-white hover:shadow-xl"
      }`}
  >
    <p className="font-medium">{cat}</p>
  </div>
))}

        </div>
      </section>

      {/* FEATURED BOOKS (Placeholders) */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <Link
  to={user ? "/dashboard" : "/login"}
  className="text-indigo-600 font-medium hover:underline"
>
  View All
</Link>

          </div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
  {user ? (
    filteredBooks.slice(0, 10).map((book) => (
      <div
        key={book._id}
        className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition"
      >
        <img
          src={book.thumbnail || "https://via.placeholder.com/150"}
          alt={book.bookName}
          className="h-40 w-full object-cover rounded mb-3"
        />
        <h3 className="font-semibold text-sm">{book.bookName}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>
      </div>
    ))
  ) : (
    [1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="bg-gray-200 h-56 rounded-xl animate-pulse"
      ></div>
    ))
  )}
</div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4">Start Your Reading Journey Today</h2>
            <p className="text-gray-700 mb-6">
              Sign up to create your own booklists and track all your favorite reads in one place.
            </p>
            <Link
              to="/register"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 text-center">
            <div className="h-64 w-full bg-white rounded-3xl shadow-lg flex items-center justify-center">
             <img
  src="/reading.jpg"
  alt="Reading illustration"
  className="h-full w-full object-cover rounded-3xl"
/>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-2">Book Management System</h3>
            <p className="text-sm">
              A MERN stack application to manage books and booklists efficiently.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
              <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">© {new Date().getFullYear()}</h4>
            <p className="text-sm">All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
