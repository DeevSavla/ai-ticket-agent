import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-800 text-white shadow-md sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-slate-100 transition-colors">
              <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Ticket<span className="text-slate-300">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!token ? (
              <>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-slate-200 hover:text-white hover:bg-slate-700 rounded-lg transition-colors font-medium text-sm"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-sm"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="h-9 w-9 bg-slate-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-200 font-medium text-sm hidden sm:inline">{user?.email}</span>
                </div>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                      isActive("/admin")
                        ? "bg-white text-slate-800"
                        : "text-slate-200 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin</span>
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm border border-slate-600 hover:border-red-500"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
