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
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOut, Settings, UserCircle, LayoutDashboard, BookUser, GraduationCap, Users, Contact, FileText } from "lucide-react";

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
  userName?: string;
  userEmail?: string;
  userImage?: string;
}

export function DashboardLayout({ 
  children, 
  navItems, 
  userRole,
  userName = "User Name",
  userEmail = "user@example.com",
  userImage 
}: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-card text-card-foreground shadow-md">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userImage || "https://placehold.co/40x40.png?text=User"} alt={userName} data-ai-hint="user avatar" />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsible=icon]:hidden transition-opacity duration-200">
                <p className="font-semibold text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </div>
          </SidebarHeader>
          <ScrollArea className="h-[calc(100%-160px)]">
            <SidebarContent className="p-2">
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton
                          isActive={item.matchSubpaths ? pathname.startsWith(item.href) : pathname === item.href}
                          className="w-full justify-start"
                          tooltip={{ children: item.label, side: "right", className: "font-body" }}
                        >
                          {item.icon}
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
            </SidebarContent>
          </ScrollArea>
          <SidebarFooter className="p-4 border-t mt-auto">
            <SidebarMenu>
                <SidebarMenuItem>
                     <Link href="/auth/login" legacyBehavior passHref>
                        <SidebarMenuButton className="w-full justify-start" tooltip={{children: "Logout", side: "right", className: "font-body"}}>
                            <LogOut className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                        </SidebarMenuButton>
                    </Link>
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

// Example Nav items
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

