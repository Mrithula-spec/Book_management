import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AllBooks from "./pages/AllBooks.jsx"
import Dashboard from "./pages/Dashboard"
import Booklist from "./pages/Booklist.jsx"
import Books from "./pages/Books"
import BookDetails from "./pages/BookDetails"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* DEFAULT → LOGIN */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />


        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booklist/view"
          element={
            <ProtectedRoute>
              <Booklist readOnly={true}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/booklist/create"
          element={
            <ProtectedRoute>
              <Booklist />
            </ProtectedRoute>
          }
        />
        <Route
  path="/books"
  element={
    <ProtectedRoute>
      <AllBooks />
    </ProtectedRoute>
  }
/>


        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
