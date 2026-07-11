"use client";

import { useMemo, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/data";

export function DirectoryClient() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return profiles.filter((profile) => {
      const matchesText = !needle || [profile.name, profile.location, profile.role, ...profile.specialties].join(" ").toLowerCase().includes(needle);
      const matchesRole = role === "All roles" || profile.role === role;
      return matchesText && matchesRole && (!verifiedOnly || profile.verified);
    });
  }, [query, role, verifiedOnly]);

  return (
    <div className="directory-layout">
      <aside className="filter-panel" aria-label="Directory filters">
        <label htmlFor="directory-search">Search</label>
        <input id="directory-search" onChange={(event) => setQuery(event.target.value)} placeholder="Name, city, specialty…" type="search" value={query} />
        <label htmlFor="role-filter">Member type</label>
        <select id="role-filter" onChange={(event) => setRole(event.target.value)} value={role}>
          <option>All roles</option>
          <option>Brand</option>
          <option>Dispensary</option>
          <option>Retailer</option>
          <option>Sales rep</option>
        </select>
        <label className="check-row"><input checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} type="checkbox" /> Verified only</label>
        <button className="text-button" onClick={() => { setQuery(""); setRole("All roles"); setVerifiedOnly(false); }} type="button">Clear filters</button>
      </aside>
      <div>
        <div className="result-bar"><p className="result-count" role="status"><strong>{matches.length === 1 ? "1 member" : `${matches.length} members`}</strong></p><span className="muted">Fictional sample profiles</span></div>
        {matches.length ? <div className="card-grid two">{matches.map((profile) => <ProfileCard key={profile.slug} profile={profile} />)}</div> : <div className="empty-state"><h2>No matches yet</h2><p>Try a broader location or remove a filter.</p></div>}
      </div>
    </div>
  );
}
