import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../api/axios"

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  const [totalBooklist, setTotalBooklist] = useState(0)
  const [totalBooks, setTotalBooks] = useState(0)
  const [recentCount, setRecentCount] = useState(0)
  const [booklists, setBooklists] = useState([]);
  const [newBooklistName, setNewBooklistName] = useState("");

  
    const fetchCounts = async () => {
      try {
        // TOTAL BOOKLISTS
        const booklistRes = await api.get("/booklist")
        const lists = Array.isArray(booklistRes.data) ? booklistRes.data : []
         setBooklists(lists)
      setTotalBooklist(lists.length)

        // TOTAL BOOKS
        const booksRes = await api.get("/books")
        const allBooks = Array.isArray(booksRes.data) ? booksRes.data : []
      setTotalBooks(allBooks.length)
        

        // RECENT BOOKLISTS (same endpoint, filtered later if needed)
        setRecentCount(lists.length)
      } catch (error) {
        console.error("Failed to load dashboard counts", error)
      }
    };

    useEffect(() => {fetchCounts();
  }, [location.pathname]);

  // Create new booklist dynamically
  const createBooklist = async () => {
    if (!newBooklistName.trim()) return
    try {
      const res = await api.post("/booklist", { name: newBooklistName })
      setBooklists((prev) => [...prev, res.data])
      setTotalBooklist((prev) => prev + 1)
      setNewBooklistName("")
    } catch (err) {
      console.error("Failed to create booklist", err)
    }
  }


  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your booklists efficiently and keep track of your reading.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Booklists */}
        <div
          className="bg-white rounded-xl shadow-md p-6 border cursor-pointer"
          onClick={() => navigate("/booklist/view")}
        >
          <h3 className="text-sm font-medium text-gray-500">
            Total Booklists
          </h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {totalBooklist}
          </p>
        </div>

        {/* Total Books */}
        <div
          className="bg-white rounded-xl shadow-md p-6 border cursor-pointer"
          onClick={() => navigate("/books")}
        >
          <h3 className="text-sm font-medium text-gray-500">
            Total Books
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {totalBooks}
          </p>
        </div>

        {/* Recently Updated */}
        <div
          className="bg-white rounded-xl shadow-md p-6 border cursor-pointer"
          onClick={() => navigate("/booklist/view")}
        >
          <h3 className="text-sm font-medium text-gray-500">
            Recently Updated
          </h3>
          <p className="mt-2 text-gray-700">
            {recentCount}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <button
            onClick={() => navigate("/booklist/create")}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
          >
            Create New Booklist
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
