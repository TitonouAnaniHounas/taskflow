import { useAuth } from "../../hooks/useAuth";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();

  const initial = user?.firstName ? user.firstName[0].toUpperCase() : "?";

  return (
    <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-6 md:px-10">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl text-ink"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-80 px-4 py-3 rounded-lg border border-border bg-paper text-base text-ink
            placeholder:text-muted
            focus:outline-none focus:ring-2 focus:ring-amber"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-2xl text-ink" aria-label="Notifications">
          🔔
        </button>
        <div
          className="w-11 h-11 rounded-full bg-amber text-ink flex items-center justify-center text-lg font-display font-bold"
          title={user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : ""}
        >
          {initial}
        </div>
      </div>
    </header>
  );
}