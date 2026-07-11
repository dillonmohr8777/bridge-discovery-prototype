import { BrandMark } from "./BrandMark";
import { NavMenu } from "./NavMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <NavMenu />
        <ThemeSwitcher compact />
      </div>
    </header>
  );
}
