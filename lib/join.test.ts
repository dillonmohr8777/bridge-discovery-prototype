import assert from "node:assert/strict";
import test from "node:test";
import {
  getJoinRole,
  joinRoles,
  missingContactFields,
  missingDetailFields,
  missingEvidenceSlots,
  submitJoinApplication,
} from "./join.ts";

test("join roles stay at the twelve live account types", () => {
  assert.deepEqual(
    joinRoles.map((role) => role.name),
    [
      "Brand",
      "Dispensary",
      "Retailer",
      "Sales rep",
      "Cultivator",
      "Manufacturer",
      "Lab",
      "Transport",
      "Bank",
      "Service",
      "Media",
      "Hydroponics",
    ],
  );
});

test("step 2 titles match the live Next up copy", () => {
  assert.equal(getJoinRole("Dispensary").nextTitle, "Organization details");
  assert.equal(getJoinRole("Sales rep").nextTitle, "Representative details");
  assert.equal(getJoinRole("Media").nextTitle, "Publisher details");
  assert.equal(getJoinRole("Hydroponics").nextTitle, "Supplier details");
});

test("required detail and evidence fields block an empty application", () => {
  const role = getJoinRole("Dispensary");
  assert.deepEqual(
    missingDetailFields(role, {}),
    ["Legal name", "Dispensary license", "Locations", "Contact owner"],
  );
  assert.deepEqual(
    missingEvidenceSlots(role, {}),
    ["EIN confirmation", "Dispensary license", "Applicant authority"],
  );
  assert.deepEqual(missingContactFields("", ""), ["Contact email", "Contact phone"]);
});

test("sales rep license evidence stays optional", () => {
  const role = getJoinRole("Sales rep");
  assert.equal(role.detailFields.find((field) => field.id === "license")?.required, false);
  assert.equal(role.evidenceSlots.find((slot) => slot.id === "licenseEvidence")?.required, false);
  assert.deepEqual(missingEvidenceSlots(role, { identityEvidence: { name: "id.pdf", size: 12 } }), []);
});

test("join submit returns a pending review receipt", async () => {
  const receipt = await submitJoinApplication({
    role: "Brand",
    details: { legalName: "Harbor Goods" },
    evidence: {},
    contactEmail: "ops@example.com",
    contactPhone: "555-0100",
  });
  assert.equal(receipt.status, "pending_review");
  assert.match(receipt.applicationId, /mock-join-brand/);
});
