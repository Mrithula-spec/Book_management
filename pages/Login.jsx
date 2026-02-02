import { useState, useContext } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

  const handleSubmit = async (e) => {
    e.preventDefault()
     if (!isValidEmail(email)) {
    alert("Please enter a valid email (example@gmail.com)")
    return
  }

    try {
      const res = await api.post("auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      login(res.data)
      navigate("/home")
    } catch {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-6">Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-4 p-2 border"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
        <p className="text-center mt-4 text-sm">
  Don’t have an account?{" "}
  <Link to="/register" className="text-blue-600 underline">
    Register
  </Link>
</p>
      </form>
    </div>
  )
}

export default Login
