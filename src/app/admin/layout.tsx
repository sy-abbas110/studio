import { DashboardLayout, adminNavItems } from "@/components/dashboard-layout";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, user data would come from auth context or server session
  const userData = {
    userName: "Admin User",
    userEmail: "admin@jbi.ac.in",
    userImage: "https://placehold.co/100x100/4B0082/E6E6FA?text=AU" // Primary BG, Background Text
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
