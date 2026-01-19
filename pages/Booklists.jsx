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
            to={`/booklist/${list._id}`}
            className="p-4 border rounded hover:shadow"
          >
            {list.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Booklist
