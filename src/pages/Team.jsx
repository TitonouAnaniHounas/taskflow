import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import EmptyState from "../components/ui/EmptyState";

export default function Team() {
  const { user } = useAuth();
  const { notify } = useNotification();

  const members = user
    ? [{ id: 1, name: `${user.firstName} ${user.lastName}`, role: user.role, isOwner: true }]
    : [];

  const [inviteOpen, setInviteOpen] = useState(false);
  const [form, setForm] = useState({ email: "", role: "Developer" });

  function handleInvite(e) {
    e.preventDefault();
    if (!form.email.trim()) return;
    notify(`Invitation sent to ${form.email}`, "info");
    setForm({ email: "", role: "Developer" });
    setInviteOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-ink">Team</h1>
        <Button className="w-auto px-5" onClick={() => setInviteOpen(true)}>
          + Invite member
        </Button>
      </div>

      {members.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No team members yet"
          description="Invite someone to collaborate with you."
          action={
            <Button className="w-auto px-5" onClick={() => setInviteOpen(true)}>
              + Invite member
            </Button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <div key={member.id} className="bg-surface rounded-2xl border border-border p-6">
              <div className="w-12 h-12 rounded-full bg-amber text-ink flex items-center justify-center font-display font-bold mb-4">
                {member.name[0]}
              </div>
              <p className="font-medium text-ink text-base">{member.name}</p>
              <p className="text-muted text-sm mt-1">{member.role}</p>
              {member.isOwner && (
                <span className="inline-block mt-3 text-xs font-medium text-amber bg-amber/10 px-2.5 py-1 rounded-full">
                  Owner
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite member">
        <form onSubmit={handleInvite} noValidate>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="colleague@exemple.com"
          />
          <div className="mb-4">
            <label className="block text-base font-medium text-ink mb-1.5">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border text-base text-ink bg-paper
              focus:outline-none focus:ring-2 focus:ring-amber"
            >
              <option>Developer</option>
              <option>Designer</option>
              <option>Viewer</option>
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send invitation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}