import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNotification } from "../hooks/useNotification";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { notify } = useNotification();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateProfile(form);
      setSaving(false);
      notify("Profile updated successfully");
    }, 500);
  }

  const initials = `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-ink">Profile</h1>

      <div className="bg-surface rounded-2xl border border-border p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-amber text-ink flex items-center justify-center text-2xl font-display font-bold shrink-0">
          {initials || "H"}
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            {form.firstName} {form.lastName}
          </p>
          <p className="text-muted">{user?.role}</p>
          <p className="text-sm text-muted mt-1">Member since {user?.memberSince}</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-5">Edit information</h2>

        {saved && (
          <div className="bg-teal/10 text-teal text-sm rounded-lg px-4 py-3 mb-4">
            ✓ Profile updated successfully
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-3">
            <Input label="First name" name="firstName" value={form.firstName} onChange={handleChange} />
            <Input label="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>

          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} />

          <div className="mb-4">
            <label className="block text-base font-medium text-ink mb-1.5">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper
              placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-amber resize-none"
            />
          </div>

          <Button type="submit" loading={saving} className="w-auto px-6">
            Save changes
          </Button>
        </form>
      </div>
    </div>
  );
}