'use client';

import DashboardLayout from "@/components/Layout/DashboardLayout";
import CategorySelector from "@/components/Settings/CategorySelector";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <CategorySelector />
    </DashboardLayout>
  );
}
