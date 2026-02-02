import { useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";


function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

  const handleSubmit = async (e) => {
    e.preventDefault()
     if (!isValidEmail(form.email)) {
    alert("Please enter a valid email (example@gmail.com)")
    return
  }

    try {
      await api.post("auth/register", form)
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          Register
        </button>
        <p className="text-center mt-4 text-sm">
  Already have an account?{" "}
  <Link to="/login" className="text-indigo-600 underline">
    Login
  </Link>
</p>

      </form>
    </div>
  )
}

export default Register
