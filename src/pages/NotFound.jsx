import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-center px-4">
      <p className="font-mono text-6xl text-amber mb-4">404</p>
      <h1 className="font-display text-2xl font-bold text-ink mb-2">Page not found</h1>
      <p className="text-muted mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/dashboard">
        <Button className="w-auto px-6">Back to Dashboard</Button>
      </Link>
    </div>
  );
}