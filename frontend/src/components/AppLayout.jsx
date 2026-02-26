import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Breadcrumbs from "./Breadcrumbs";

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="content-shell">
        <Sidebar />
        <main className="main-content">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
