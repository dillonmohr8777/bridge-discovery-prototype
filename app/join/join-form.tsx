"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { MemberRole } from "@/lib/types";
import {
  getJoinRole,
  joinRoles,
  missingContactFields,
  missingDetailFields,
  missingEvidenceSlots,
  submitJoinApplication,
  type JoinDetails,
  type JoinEvidence,
  type JoinStep,
} from "@/lib/join";

type FormStatus = "idle" | "pending" | "success" | "error";

const headings: Record<JoinStep, { title: string; lede: string }> = {
  1: {
    title: "How do you work in cannabis?",
    lede: "Your role shapes profile fields, verification requirements, and the dashboard experience.",
  },
  2: {
    title: "",
    lede: "",
  },
  3: {
    title: "Verification evidence",
    lede: "Upload the documents that support this application. Requirements shown are provisional pending the verification policy (decision D-03).",
  },
  4: {
    title: "Review",
    lede: "Confirm the role, details, and evidence before you submit. You can go back and edit anything.",
  },
};

export function JoinForm() {
  const [step, setStep] = useState<JoinStep>(1);
  const [selectedRole, setSelectedRole] = useState<MemberRole>("Brand");
  const [details, setDetails] = useState<JoinDetails>({});
  const [evidence, setEvidence] = useState<JoinEvidence>({});
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);

  const selected = useMemo(() => getJoinRole(selectedRole), [selectedRole]);

  function updateDetail(id: string, value: string) {
    setDetails((current) => ({ ...current, [id]: value }));
  }

  function updateEvidence(id: string, file: File | null) {
    setEvidence((current) => ({
      ...current,
      [id]: file ? { name: file.name, size: file.size } : null,
    }));
  }

  function goTo(next: JoinStep) {
    setFieldError("");
    setStep(next);
  }

  function continueFromRole() {
    setStatus("idle");
    setApplicationId(null);
    goTo(2);
  }

  function continueFromDetails() {
    const missing = missingDetailFields(selected, details);
    if (missing.length) {
      setFieldError(`Add ${missing.join(", ").toLowerCase()} before continuing.`);
      return;
    }
    goTo(3);
  }

  function continueFromEvidence() {
    const missing = [
      ...missingEvidenceSlots(selected, evidence),
      ...missingContactFields(contactEmail, contactPhone),
    ];
    if (missing.length) {
      setFieldError(`Add ${missing.join(", ").toLowerCase()} before continuing.`);
      return;
    }
    goTo(4);
  }

  async function submit() {
    if (status === "pending" || status === "success") return;
    setStatus("pending");
    setFieldError("");
    try {
      const receipt = await submitJoinApplication(
        {
          role: selectedRole,
          details,
          evidence,
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
        },
        { simulateFailure },
      );
      setApplicationId(receipt.applicationId);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const heading = step === 2
    ? { title: selected.nextTitle, lede: selected.requirements }
    : headings[step];

  if (status === "success") {
    return (
      <>
        <div className="page-heading">
          <p className="eyebrow">Application received</p>
          <h1>Your application is pending review.</h1>
          <p className="lede">
            {selected.name} details and evidence were accepted for review
            {applicationId ? ` · ${applicationId}` : ""}. Contact details stay private until verification is complete.
          </p>
        </div>
        <p className="form-hint">
          Prototype: this submission was simulated and nothing was stored. Production save and resume still needs
          member accounts from Miraj&rsquo;s backend contract.
        </p>
        <div className="button-row">
          <button
            className="button secondary"
            onClick={() => {
              setStatus("idle");
              setApplicationId(null);
              goTo(1);
            }}
            type="button"
          >
            Start another application
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">Step {step} of 4</p>
        <h1>{heading.title}</h1>
        <p className="lede">{heading.lede}</p>
      </div>

      <form className="join-form" noValidate onSubmit={(event) => event.preventDefault()}>
        {step === 1 && (
          <>
            <fieldset>
              <legend className="sr-only">Choose your member role</legend>
              <div className="role-grid">
                {joinRoles.map((role, index) => (
                  <label className="role-card" key={role.name}>
                    <input
                      checked={selectedRole === role.name}
                      name="role"
                      onChange={() => {
                        setSelectedRole(role.name);
                        setDetails({});
                        setEvidence({});
                        setContactEmail("");
                        setContactPhone("");
                      }}
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
              <button className="button primary" onClick={continueFromRole} type="button">
                Continue
              </button>
            </div>
            <p className="form-hint">Requirements shown are provisional pending the verification policy (decision D-03).</p>
            <div className="join-pricing-note">
              <div>
                <p className="eyebrow">Founding member concept</p>
                <strong>First six months proposed free, then $349 per month for a verified business membership.</strong>
              </div>
              <Link className="text-link" href="/pricing">Review pricing assumptions</Link>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="field-row">
              {selected.detailFields.map((field) => (
                <label htmlFor={`join-${field.id}`} key={field.id}>
                  {field.label}
                  {field.kind === "textarea" ? (
                    <textarea
                      id={`join-${field.id}`}
                      onChange={(event) => updateDetail(field.id, event.target.value)}
                      required={field.required}
                      rows={3}
                      value={details[field.id] ?? ""}
                    />
                  ) : (
                    <input
                      id={`join-${field.id}`}
                      onChange={(event) => updateDetail(field.id, event.target.value)}
                      required={field.required}
                      type="text"
                      value={details[field.id] ?? ""}
                    />
                  )}
                </label>
              ))}
            </div>
            {fieldError && <p className="form-error" role="alert">{fieldError}</p>}
            <div className="form-preview">
              <div>
                <span className="step-label">Next up</span>
                <strong>Verification evidence</strong>
                <small>Upload the documents that support this {selected.name.toLowerCase()} application.</small>
              </div>
              <div className="button-row">
                <button className="button secondary" onClick={() => goTo(1)} type="button">Back</button>
                <button className="button primary" onClick={continueFromDetails} type="button">Continue</button>
              </div>
            </div>
            <p className="form-hint">Requirements shown are provisional pending the verification policy (decision D-03).</p>
          </>
        )}

        {step === 3 && (
          <>
            <div className="field-row">
              {selected.evidenceSlots.map((slot) => (
                <label htmlFor={`evidence-${slot.id}`} key={slot.id}>
                  {slot.label}
                  <input
                    accept=".png,.jpg,.jpeg,.webp,.pdf,image/png,image/jpeg,image/webp,application/pdf"
                    id={`evidence-${slot.id}`}
                    onChange={(event) => updateEvidence(slot.id, event.target.files?.[0] ?? null)}
                    required={slot.required}
                    type="file"
                  />
                  <small className="form-hint">{slot.hint}</small>
                  {evidence[slot.id] && (
                    <small className="form-hint">
                      Selected: <strong>{evidence[slot.id]?.name}</strong>
                    </small>
                  )}
                </label>
              ))}
              <label htmlFor="join-contact-email">
                Contact email
                <input
                  id="join-contact-email"
                  onChange={(event) => setContactEmail(event.target.value)}
                  required
                  type="email"
                  value={contactEmail}
                />
              </label>
              <label htmlFor="join-contact-phone">
                Contact phone
                <input
                  id="join-contact-phone"
                  onChange={(event) => setContactPhone(event.target.value)}
                  required
                  type="tel"
                  value={contactPhone}
                />
              </label>
            </div>
            {fieldError && <p className="form-error" role="alert">{fieldError}</p>}
            <div className="form-preview">
              <div>
                <span className="step-label">Next up</span>
                <strong>Review</strong>
                <small>Confirm this application before it is sent for verification.</small>
              </div>
              <div className="button-row">
                <button className="button secondary" onClick={() => goTo(2)} type="button">Back</button>
                <button className="button primary" onClick={continueFromEvidence} type="button">Continue</button>
              </div>
            </div>
            <p className="form-hint">
              Evidence files stay on this device in the prototype. Production upload, storage, and save and resume
              are part of Miraj&rsquo;s backend contract.
            </p>
          </>
        )}

        {step === 4 && (
          <>
            <div className="system-stack">
              <section className="content-card">
                <p className="eyebrow">Role</p>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
              </section>
              <section className="content-card">
                <p className="eyebrow">{selected.nextTitle}</p>
                {selected.detailFields.map((field) => (
                  <p key={field.id}>
                    <span className="form-hint">{field.label}</span>
                    <br />
                    <strong>{details[field.id]?.trim() || "Not provided"}</strong>
                  </p>
                ))}
              </section>
              <section className="content-card">
                <p className="eyebrow">Verification evidence</p>
                {selected.evidenceSlots.map((slot) => (
                  <p key={slot.id}>
                    <span className="form-hint">{slot.label}</span>
                    <br />
                    <strong>{evidence[slot.id]?.name || "Not attached"}</strong>
                  </p>
                ))}
                <p>
                  <span className="form-hint">Contact email</span>
                  <br />
                  <strong>{contactEmail}</strong>
                </p>
                <p>
                  <span className="form-hint">Contact phone</span>
                  <br />
                  <strong>{contactPhone}</strong>
                </p>
              </section>
            </div>
            {status === "error" && (
              <p className="form-error" role="alert">
                The application could not be sent. Your answers are still here — try again.
              </p>
            )}
            <div className="form-preview">
              <div>
                <span className="step-label">Submit</span>
                <strong>Send for review</strong>
                <small>Verification stays pending until an administrator reviews the evidence.</small>
              </div>
              <div className="button-row">
                <button className="button secondary" disabled={status === "pending"} onClick={() => goTo(3)} type="button">
                  Back
                </button>
                <button className="button primary" disabled={status === "pending"} onClick={() => void submit()} type="button">
                  {status === "pending" ? "Submitting…" : status === "error" ? "Try again" : "Submit application"}
                </button>
              </div>
            </div>
            <p className="form-hint">
              Prototype: submissions are simulated. Production persistence, member accounts, and save and resume
              remain on Miraj&rsquo;s backend contract.
            </p>
            <details className="demo-controls">
              <summary>Prototype demo controls</summary>
              <label className="check-row">
                <input
                  checked={simulateFailure}
                  onChange={(event) => setSimulateFailure(event.target.checked)}
                  type="checkbox"
                />
                Simulate a network failure
              </label>
            </details>
          </>
        )}
      </form>
    </>
  );
}
