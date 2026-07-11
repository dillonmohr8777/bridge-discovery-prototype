// Shared (server + client) direction constants and the optional build-time lock.
// Staging builds set NEXT_PUBLIC_DIRECTION_LOCK to pin the whole app to one
// provisional direction; normal builds leave it unset and stay switchable.

export const themeIds = ["current", "network", "botanical"] as const;
export type ThemeId = (typeof themeIds)[number];

export const directionNames: Record<ThemeId, string> = {
  current: "Trusted Current",
  network: "Modern Network",
  botanical: "Botanical Ledger",
};

const candidate = process.env.NEXT_PUBLIC_DIRECTION_LOCK;

export const lockedTheme: ThemeId | null = (themeIds as readonly string[]).includes(candidate ?? "")
  ? (candidate as ThemeId)
  : null;
