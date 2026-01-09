import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { Link } from "react-router-dom";
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
          path="/booklists/view"
          element={
            <ProtectedRoute>
              <Booklists readOnly={true}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/booklists/create"
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
