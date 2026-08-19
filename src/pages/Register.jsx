import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { isValidEmail, isValidPassword } from "../utils/validators";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Champ requis.";
    if (!form.lastName.trim()) newErrors.lastName = "Champ requis.";
    if (!isValidEmail(form.email)) newErrors.email = "Adresse email invalide.";
    if (!isValidPassword(form.password)) newErrors.password = "6 caractères minimum.";
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }
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
        register({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        });
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
      <h1 className="font-display text-2xl font-bold text-ink mb-1">Créer un compte</h1>
      <p className="text-muted mb-6">Rejoins TaskFlow en quelques secondes.</p>

      {apiError && (
        <div className="bg-brick/10 text-brick text-sm rounded-lg px-4 py-3 mb-4">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} />
          <Input label="Nom" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} />
        </div>

        <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="toi@exemple.com" />
        <Input label="Mot de passe" type="password" name="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="••••••••" />
        <Input label="Confirmation" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="••••••••" />

        <Button type="submit" loading={loading} className="mt-2">
          Créer mon compte
        </Button>
      </form>

      <p className="text-center text-muted text-sm mt-6">
        Déjà un compte ?{" "}
        <Link to="/login" className="text-amber font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}