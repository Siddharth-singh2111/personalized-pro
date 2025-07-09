'use client';

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">
        <Topbar />
        
        {/* 🔽 Wrap children like this */}
        <div className="flex flex-col h-full overflow-auto px-6 py-6 text-gray-900 dark:text-white">
  {children}
</div>

      </div>
    </div>
  );
}