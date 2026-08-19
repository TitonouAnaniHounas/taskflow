import { useNotification } from "../../hooks/useNotification";

const typeStyles = {
  success: { icon: "✅", border: "border-teal" },
  error: { icon: "⚠️", border: "border-brick" },
  info: { icon: "🔔", border: "border-amber" },
  danger: { icon: "🗑️", border: "border-brick" },
};

export default function NotificationStack() {
  const { notifications, dismiss } = useNotification();

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm">
      {notifications.map((n) => {
        const style = typeStyles[n.type] || typeStyles.info;
        return (
          <div
            key={n.id}
            className={`bg-surface border-l-4 ${style.border} rounded-lg shadow-lg px-4 py-3 
            flex items-start gap-3 animate-in slide-in-from-right`}
          >
            <span className="text-lg shrink-0">{style.icon}</span>
            <p className="text-base text-ink flex-1">{n.message}</p>
            <button
              onClick={() => dismiss(n.id)}
              className="text-muted hover:text-ink shrink-0"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}