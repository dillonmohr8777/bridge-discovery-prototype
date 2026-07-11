import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { lockedTheme } from "@/lib/direction-lock";

export const metadata: Metadata = {
  title: "Bridge — Cannabis industry connections",
  description: "Discovery prototype for a verified cannabis industry directory and professional network.",
  icons: { icon: "/bridge-mark.svg" },
  // Staging previews must not be indexed.
  robots: lockedTheme ? { index: false, follow: false } : undefined,
};

// Applies the saved provisional direction before first paint so a full page
// load does not flash the default theme. Skipped on direction-locked builds.
const themeInitScript = `(function(){try{var t=window.localStorage.getItem("bridge-theme");if(t==="network"||t==="botanical"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme={lockedTheme ?? "current"} suppressHydrationWarning>
      <body>
        {!lockedTheme && <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />}
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <span>Bridge discovery prototype</span>
            <span>Provisional identity · pending Tori approval</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
