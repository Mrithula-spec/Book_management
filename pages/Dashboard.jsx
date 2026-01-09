import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
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
        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h3 className="text-sm font-medium text-gray-500">
            Total Booklists
          </h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            —
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h3 className="text-sm font-medium text-gray-500">
            Total Books
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            —
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h3 className="text-sm font-medium text-gray-500">
            Recently Updated
          </h3>
          <p className="mt-2 text-gray-700">
            View your latest booklists
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="/booklists"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            <Link to="/booklists/view">View Booklists</Link>
          </a>

          <a
            href="/booklists"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
          >
          <Link to="/booklists/create">Create New Booklist</Link>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
