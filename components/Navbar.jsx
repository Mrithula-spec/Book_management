import { Link } from "react-router-dom"
import { useContext } from "react"
import logo from "../assets/logo.png"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
  <img
    src={logo}
    alt="Book Management Logo"
    className="h-20 w-20 object-contain"
  />
  <h1 className="text-xl font-bold">Book Management System</h1>
</div>


      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
