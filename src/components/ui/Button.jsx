export default function Button({ children, loading, variant = "primary", className = "", ...props }) {
  const base = "w-full py-3 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-light",
    danger: "bg-brick text-white hover:opacity-90",
    ghost: "bg-transparent text-ink hover:bg-paper border border-border",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}