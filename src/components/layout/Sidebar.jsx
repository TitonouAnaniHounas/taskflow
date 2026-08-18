import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/projects", label: "Projects", icon: "📁" },
  { to: "/tasks", label: "Tasks", icon: "✅" },
  { to: "/calendar", label: "Calendar", icon: "📅" },
  { to: "/team", label: "Team", icon: "👥" },
];

const bottomItems = [
  { to: "/settings", label: "Settings", icon: "⚙️" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ isOpen, onClose }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }
  
    return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-ink border-r border-ink-light 
        flex flex-col z-40 transform transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-7 py-7 font-display text-2xl font-bold text-amber tracking-tight">
          TaskFlow
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                ${isActive
                  ? "bg-ink-light text-amber"
                  : "text-gray-300 hover:bg-ink-light hover:text-white"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-ink-light space-y-1.5">
          {bottomItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                ${isActive
                  ? "bg-ink-light text-amber"
                  : "text-gray-300 hover:bg-ink-light hover:text-white"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
           <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-brick hover:bg-ink-light w-full transition-colors"
            >
                <span className="text-lg">🚪</span>
                Logout
            </button>
        </div>
      </aside>
    </>
  );
}