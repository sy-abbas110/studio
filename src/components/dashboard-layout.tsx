// src/components/dashboard-layout.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOut, Settings, UserCircle, LayoutDashboard, BookUser, GraduationCap, Users, Contact, FileText, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  matchSubpaths?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userRole: "admin" | "student";
  userName?: string; // Can be overridden by props if needed, otherwise from context
  userEmail?: string; // Can be overridden by props
  userImage?: string; // Can be overridden by props
}

export function DashboardLayout({ 
  children, 
  navItems, 
  userRole,
  userName: propUserName,
  userEmail: propUserEmail,
  userImage: propUserImage
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
    } catch (error) {
      toast({ title: "Logout Failed", description: "Could not log out. Please try again.", variant: "destructive" });
      console.error("Logout error in dashboard layout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const displayName = propUserName || user?.displayName || (userRole === "admin" ? "Admin User" : "Student User");
  const displayEmail = propUserEmail || user?.email || (userRole === "admin" ? "admin@example.com" : "student@example.com");
  const displayImage = propUserImage || user?.photoURL || `https://placehold.co/40x40.png?text=${displayName.substring(0,1).toUpperCase()}`;


  if (loading && !user) { // Show loading only if user is not yet available
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-card text-card-foreground shadow-md">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={displayImage} alt={displayName} data-ai-hint="user avatar" />
                <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden transition-opacity duration-200">
                <p className="font-semibold text-sm">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayEmail}</p>
              </div>
            </div>
          </SidebarHeader>
          <ScrollArea className="h-[calc(100%-160px)]"> {/* Adjusted height for header + footer */}
            <SidebarContent className="p-2">
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.matchSubpaths ? pathname.startsWith(item.href) : pathname === item.href}
                        className="w-full justify-start"
                        tooltip={{ children: item.label, side: "right", className: "font-body" }}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
            </SidebarContent>
          </ScrollArea>
          <SidebarFooter className="p-4 border-t mt-auto">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        onClick={handleLogout} 
                        className="w-full justify-start" 
                        tooltip={{children: "Logout", side: "right", className: "font-body"}}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}
                        <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 overflow-y-auto bg-background">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur px-6 shadow-sm">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold font-headline text-primary capitalize">{userRole} Panel</h1>
            </header>
            <div className="p-4 md:p-6 lg:p-8">
             {children}
            </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

// Nav items
export const adminNavItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, matchSubpaths: true },
  { href: "/admin/enroll-student", label: "Enroll Student", icon: <BookUser className="h-5 w-5" /> },
  { href: "/admin/students", label: "Manage Students", icon: <Users className="h-5 w-5" /> },
  { href: "/admin/courses", label: "Manage Courses", icon: <GraduationCap className="h-5 w-5" /> },
  { href: "/admin/certificates", label: "Certificates", icon: <FileText className="h-5 w-5" /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

export const studentNavItems: NavItem[] = [
  { href: "/student/profile", label: "My Profile", icon: <UserCircle className="h-5 w-5" />, matchSubpaths: true },
  { href: "/student/courses", label: "My Courses", icon: <GraduationCap className="h-5 w-5" /> },
  { href: "/student/results", label: "My Results", icon: <FileText className="h-5 w-5" /> },
  { href: "/student/certificate", label: "My Certificate", icon: <FileText className="h-5 w-5" /> },
  { href: "/student/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  { href: "/contact?subject=student_support", label: "Support", icon: <Contact className="h-5 w-5" /> },
];
