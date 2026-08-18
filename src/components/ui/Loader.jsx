export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-16 text-muted text-base gap-2">
      <span className="animate-spin">⏳</span>
      {label}
    </div>
  );
}