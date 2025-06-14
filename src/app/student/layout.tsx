// src/app/student/layout.tsx
"use client";
import { DashboardLayout, studentNavItems } from "@/components/dashboard-layout";
import withAuth from "@/components/auth/with-auth"; // Assuming students also need to be logged in
import { useAuth } from "@/contexts/auth-context";
import { ReactNode } from "react";

function StudentPanelLayoutContent({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  // Use user data from AuthContext, or fall back to props/defaults if needed for flexibility
  const userData = {
    userName: user?.displayName || "Student User",
    userEmail: user?.email || "student@example.com",
    userImage: user?.photoURL || `https://placehold.co/100x100/E6E6FA/4B0082?text=${(user?.displayName || user?.email || "S").substring(0,1).toUpperCase()}`
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

// If student routes also need protection (they likely do)
// For now, the user asked for admin protection. If student routes also need it, this line should be uncommented.
const ProtectedStudentPanelLayout = withAuth(StudentPanelLayoutContent, ['student', 'admin']); // Example: allow admin to view student panel
// If student routes are public for logged-in students without specific role checks beyond being authenticated:
// const ProtectedStudentPanelLayout = withAuth(StudentPanelLayoutContent, []); // Empty array means any authenticated user

export default ProtectedStudentPanelLayout;
// If student routes don't need auth protection yet, use:
// export default StudentPanelLayoutContent;
