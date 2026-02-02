import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      {/* Global Back Button */}
      {/* Hide on login/register pages */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 transition z-50"
        >
          ← 
        </button>
      )}

      {/* Render current page */}
      <Outlet />
    </div>
  );
}

export default Layout;
