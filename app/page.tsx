import Link from "next/link";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Verified cannabis industry network</p>
          <h1>Build the connections that move your business forward.</h1>
          <p className="lede">Discover trusted brands, retailers, dispensaries, and sales representatives in one professional directory.</p>
          <div className="button-row">
            <Link className="button primary" href="/directory">Explore the directory</Link>
            <Link className="button secondary" href="/join">Create a profile</Link>
          </div>
          <div className="trust-row" aria-describedby="trust-row-note">
            <span><strong>420+</strong> profiles</span>
            <span><strong>28</strong> markets</span>
            <span><strong>71%</strong> verified</span>
          </div>
          <p className="form-hint" id="trust-row-note">Illustrative sample figures for the discovery prototype.</p>
        </div>
        <div className="hero-panel" aria-label="Example connection workflow">
          <div className="mini-card offset-left"><span className="avatar">CC</span><div><strong>Cascade Canna Co.</strong><small>Brand · Portland</small></div></div>
          <div className="bridge-line"><span>Verified connection</span></div>
          <div className="mini-card offset-right"><span className="avatar alt">HD</span><div><strong>Harbor Dispensary</strong><small>Dispensary · Baltimore</small></div></div>
          <div className="panel-note"><span className="signal-dot" /> Contact request accepted</div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><p className="eyebrow">Explore the network</p><h2>Featured members</h2></div>
          <Link className="text-link" href="/directory">Browse all <span aria-hidden="true">→</span></Link>
        </div>
        <div className="card-grid">{profiles.slice(0, 3).map((profile) => <ProfileCard key={profile.slug} profile={profile} />)}</div>
      </section>

      <section className="section value-section">
        <div className="shell">
          <div className="section-heading narrow"><div><p className="eyebrow">Built around trust</p><h2>A professional layer for a fragmented industry.</h2></div></div>
          <div className="value-grid">
            <article><span className="number">01</span><h3>Find the right fit</h3><p>Search by role, location, market, specialty, and verification status.</p></article>
            <article><span className="number">02</span><h3>Know who is real</h3><p>Business and licensing checks create a clearer starting point for outreach.</p></article>
            <article><span className="number">03</span><h3>Make a warm introduction</h3><p>Send structured contact requests without exposing personal details publicly.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
