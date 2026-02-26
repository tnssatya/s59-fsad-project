import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import ThemeSettings from "./ThemeSettings";
import Button from "../ui/Button";

const PUBLIC_ROUTES = ["/landing", "/login", "/register"];

function ThemeSettingsLauncher() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  if (!PUBLIC_ROUTES.includes(pathname)) return null;

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        iconLeft={FiSettings}
        className="fixed bottom-4 right-4 z-30 shadow-panel"
        onClick={() => setOpen(true)}
        aria-label="Open theme settings"
      >
        Theme
      </Button>
      <ThemeSettings isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default ThemeSettingsLauncher;
