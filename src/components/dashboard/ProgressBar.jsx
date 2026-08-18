export default function ProgressBar({ percent, color = "#D9A441" }) {
  return (
    <div className="w-full h-2 rounded-full bg-paper overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}