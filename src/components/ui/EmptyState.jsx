export default function EmptyState({ icon = "📭", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl mb-3">{icon}</span>
      <p className="text-ink font-medium text-lg mb-1">{title}</p>
      {description && <p className="text-muted text-base mb-5">{description}</p>}
      {action}
    </div>
  );
}