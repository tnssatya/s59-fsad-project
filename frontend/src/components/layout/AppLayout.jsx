import { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeSettings from "./ThemeSettings";

function AppLayout() {
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Navbar onOpenThemeSettings={() => setIsThemeSettingsOpen(true)} />
      <div className="mx-auto flex max-w-360">
        <Sidebar />
        <main className="min-h-[calc(100vh-64px)] flex-1 p-4 md:p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
      <ThemeSettings
        isOpen={isThemeSettingsOpen}
        onClose={() => setIsThemeSettingsOpen(false)}
      />
    </div>
  );
}

export default AppLayout;
