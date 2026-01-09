import { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

function Booklists({readOnly=false}) {
  const [lists, setLists] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    const res = await api.get("/booklists")
    setLists(res.data)
  }

  const createList = async () => {
    await api.post("/booklists", { name })
    setName("")
    fetchLists()
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
          <Link
            key={list._id}
            to={`/booklists/${list._id}`}
            className="p-4 border rounded hover:shadow"
          >
            {list.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Booklists
