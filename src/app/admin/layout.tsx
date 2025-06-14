// src/app/admin/layout.tsx
"use client";
import { DashboardLayout, adminNavItems } from "@/components/dashboard-layout";
import withAuth from "@/components/auth/with-auth";
import { useAuth } from "@/contexts/auth-context";
import { ReactNode } from "react";

function AdminPanelLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  const userData = {
    userName: user?.displayName || "Admin User",
    userEmail: user?.email || "admin@example.com",
    userImage: user?.photoURL || `https://placehold.co/100x100/4B0082/E6E6FA?text=${(user?.displayName || user?.email || "A").substring(0,1).toUpperCase()}` 
  };

  return (
    <DashboardLayout 
      navItems={adminNavItems} 
      userRole="admin"
      userName={userData.userName}
      userEmail={userData.userEmail}
      userImage={userData.userImage}
    >
      {children}
    </DashboardLayout>
  );
}

// Wrap the layout content with the HOC
const ProtectedAdminPanelLayout = withAuth(AdminPanelLayoutContent, ['admin']);

export default ProtectedAdminPanelLayout;
