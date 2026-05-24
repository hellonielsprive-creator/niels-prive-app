import type { ReactNode } from "react";

import DashboardProvider from "@/app/components/dashboard/DashboardProvider";
import DashboardSyncController from "@/app/components/dashboard/DashboardSyncController";

export default function PartnerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardSyncController />
      {children}
    </DashboardProvider>
  );
}
