import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Bridge — Cannabis industry connections",
  description: "Discovery prototype for a verified cannabis industry directory and professional network.",
  icons: { icon: "/bridge-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="current">
      <body>
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
