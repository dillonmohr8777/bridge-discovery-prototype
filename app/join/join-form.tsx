"use client";

import { useState } from "react";
import type { MemberRole } from "@/lib/types";

// Role requirements are provisional pending the verification policy (decision D-03).
const roles: { name: MemberRole; description: string; nextTitle: string; requirements: string }[] = [
  {
    name: "Brand",
    description: "Show products, markets, and retail partnership needs.",
    nextTitle: "Organization details",
    requirements: "Legal name, public name, EIN, license, location, and contact owner.",
  },
  {
    name: "Dispensary",
    description: "Find brands and representatives aligned with your customers.",
    nextTitle: "Organization details",
    requirements: "Legal name, dispensary license, locations, and contact owner.",
  },
  {
    name: "Retailer",
    description: "Build a verified organization profile for partner discovery.",
    nextTitle: "Organization details",
    requirements: "Legal name, retail license or permit, locations, and contact owner.",
  },
  {
    name: "Sales rep",
    description: "Represent territories, specialties, and available relationships.",
    nextTitle: "Representative details",
    requirements: "Name, territories, current lines, references, and license where a state requires one.",
  },
];

export function JoinForm() {
  const [selectedRole, setSelectedRole] = useState<MemberRole>("Brand");
  const [showBoundaryNote, setShowBoundaryNote] = useState(false);
  const selected = roles.find((role) => role.name === selectedRole) ?? roles[0];

  return (
    <form className="join-form" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend className="sr-only">Choose your member role</legend>
        <div className="role-grid">
          {roles.map((role, index) => (
            <label className="role-card" key={role.name}>
              <input
                checked={selectedRole === role.name}
                name="role"
                onChange={() => setSelectedRole(role.name)}
                type="radio"
                value={role.name}
              />
              <span className="role-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{role.name}</strong>
              <small>{role.description}</small>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-preview">
        <div>
          <span className="step-label">Next up</span>
          <strong>{selected.nextTitle}</strong>
          <small>{selected.requirements}</small>
        </div>
        <button className="button primary" onClick={() => setShowBoundaryNote(true)} type="button">
          Continue
        </button>
      </div>
      <p className="form-hint">Requirements shown are provisional pending the verification policy (decision D-03).</p>
      <div aria-live="polite" role="status">
        {showBoundaryNote && (
          <p className="boundary-note">
            Steps 2–4 — {selected.nextTitle.toLowerCase()}, verification evidence, and review — are built after
            Monday&rsquo;s decisions. Save and resume needs member accounts, which are part of Miraj&rsquo;s backend
            contract.
          </p>
        )}
      </div>
    </form>
  );
}
