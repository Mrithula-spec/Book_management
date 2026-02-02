import { useEffect, useState } from "react"
import api from "../api/axios"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

function Booklist({readOnly=false}) {
  const [lists, setLists] = useState([])
  const [name, setName] = useState("")
  const location = useLocation()
  const sort = new URLSearchParams(location.search).get("sort")


  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    const res = await api.get("/booklist")
    setLists(res.data)
  }

  const createList = async () => {
    await api.post("/booklist", { name })
    setName("")
    fetchLists()
  }
  const handleDeleteBooklist = async (id) => {
  try {
    await api.delete(`/booklist/${id}`)
    setLists((prev) => prev.filter((list) => list._id !== id))
   
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message)
  }
}


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Booklists</h2>
      {!readOnly&&(

      <div className="flex gap-2 mb-6">
        <input
          placeholder="New Booklist"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <button onClick={createList} className="bg-green-600 text-white px-4">
          Add
        </button>
      </div>)}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {lists.map((list) => (
    <div
      key={list._id}
      className="flex items-center justify-between p-4 border rounded hover:shadow"
    >
    {readOnly ? (
  <span className="font-medium text-gray-700 ">
    {list.name}
  </span>
) : (
  <Link
    to={`/booklist/${list._id}`}
    className="font-medium text-indigo-600 hover:underline"
  >
    {list.name}
  </Link>
)}



      {!readOnly && (
        <button
          onClick={() => handleDeleteBooklist(list._id,list.name)}
          className="text-red-600 font-bold text-lg"
        >
          ×
        </button>
      )}
    </div>
  ))}
</div>



    </div>
  )
}

export default Booklist
