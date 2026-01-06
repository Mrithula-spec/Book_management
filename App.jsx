import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Booklists from "./pages/Booklists"
import Books from "./pages/Books"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booklists"
          element={
            <ProtectedRoute>
              <Booklists />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booklists/:id"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
