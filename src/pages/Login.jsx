import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { isValidEmail, isValidPassword } from "../utils/validators";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!isValidEmail(form.email)) newErrors.email = "Adresse email invalide.";
    if (!isValidPassword(form.password)) newErrors.password = "6 caractères minimum.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      try {
        login({ email: form.email, password: form.password });
        navigate("/dashboard");
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Se connecter</h1>
      <p className="text-muted mb-6">Content de te revoir.</p>

      {apiError && (
        <div className="bg-brick/10 text-brick text-sm rounded-lg px-4 py-3 mb-4">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="toi@exemple.com"
        />
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
        />

        <div className="text-right mb-6">
          <a href="#" className="text-sm text-amber font-medium hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <Button type="submit" loading={loading}>Se connecter</Button>
      </form>

      <p className="text-center text-muted text-sm mt-6">
        Pas encore de compte ?{" "}
        <Link to="/register" className="text-amber font-medium hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}