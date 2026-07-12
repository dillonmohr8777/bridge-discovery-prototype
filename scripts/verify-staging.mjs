import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const directions = ["current", "network", "botanical"];
const expectedRoutes = [
  "index.html",
  "directory/index.html",
  "join/index.html",
  "dashboard/index.html",
  "admin/verification/index.html",
  "directions/index.html",
  "design-system/index.html",
  "profile/cascade-canna/index.html",
];

for (const direction of directions) {
  const outputRoot = join(root, "staging", direction);
  assert.ok(existsSync(outputRoot), `Missing staging output for ${direction}`);

  const home = readFileSync(join(outputRoot, "index.html"), "utf8");
  assert.match(home, new RegExp(`data-theme=\\"${direction}\\"`), `${direction} theme is not pinned`);
  assert.match(home, /Provisional preview/, `${direction} preview is not labeled provisional`);
  assert.match(home, /noindex/, `${direction} preview is missing noindex metadata`);

  for (const route of expectedRoutes) {
    assert.ok(existsSync(join(outputRoot, route)), `${direction} is missing ${route}`);
  }
}

console.log(`Verified ${directions.length} direction builds and ${expectedRoutes.length} routes per build.`);
