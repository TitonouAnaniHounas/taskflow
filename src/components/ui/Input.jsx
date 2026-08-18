export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-base font-medium text-ink mb-1.5">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-lg border text-base text-ink bg-paper
        placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-amber
        ${error ? "border-brick" : "border-border"}`}
      />
      {error && <p className="text-sm text-brick mt-1.5">{error}</p>}
    </div>
  );
}