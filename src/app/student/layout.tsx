import { DashboardLayout, studentNavItems } from "@/components/dashboard-layout";

export default function StudentPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, user data would come from auth context or server session
  const userData = {
    userName: "Aarav Sharma",
    userEmail: "aarav.sharma@example.com",
    userImage: "https://placehold.co/100x100/E6E6FA/4B0082?text=AS" // Background BG, Primary Text
  };
  return (
    <DashboardLayout 
      navItems={studentNavItems} 
      userRole="student"
      userName={userData.userName}
      userEmail={userData.userEmail}
      userImage={userData.userImage}
    >
      {children}
    </DashboardLayout>
  );
}
