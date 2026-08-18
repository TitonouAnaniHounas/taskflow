export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-brick text-base font-medium mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-lg bg-ink text-white text-sm font-medium hover:bg-ink-light transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}