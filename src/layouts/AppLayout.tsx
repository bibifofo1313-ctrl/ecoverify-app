import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/app/Sidebar";
import { TopBar } from "../components/app/TopBar";

export const AppLayout = () => (
  <div className="app-shell relative flex min-h-screen overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-aurora opacity-30" />
    <Sidebar />
    <div className="relative flex min-h-screen flex-1 flex-col">
      <TopBar />
      <main className="flex-1 px-6 py-8 lg:px-10">
        <Outlet />
      </main>
    </div>
  </div>
);
