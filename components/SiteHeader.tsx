import { directionNames, lockedTheme } from "@/lib/direction-lock";
import { BrandMark } from "./BrandMark";
import { NavMenu } from "./NavMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <NavMenu />
        {lockedTheme ? (
          <span className="status-chip preview-chip">Provisional preview · {directionNames[lockedTheme]}</span>
        ) : (
          <ThemeSwitcher compact />
        )}
      </div>
    </header>
  );
}
