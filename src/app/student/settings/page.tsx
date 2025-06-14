
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bell, KeyRound, UserCircle, Palette } from "lucide-react";
import Link from "next/link";

export default function StudentSettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been (simulated) saved.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and security.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary"/> Profile Information</CardTitle>
          <CardDescription>Update your contact details or request changes to personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentEmail">Email Address</Label>
            <Input id="studentEmail" type="email" defaultValue="aarav.sharma@example.com" disabled />
            <p className="text-sm text-muted-foreground">Your email address cannot be changed directly. Contact admin for assistance.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentPhone">Phone Number</Label>
            <Input id="studentPhone" type="tel" defaultValue="+91 98765 43210" />
          </div>
           <Button onClick={() => handleSaveChanges("Profile Information")}>Save Profile Changes</Button>
           <Button variant="outline" asChild className="ml-2">
                <Link href="/contact?subject=profile_update_request">Request Other Profile Updates</Link>
           </Button>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><KeyRound className="mr-2 h-5 w-5 text-primary"/> Password & Security</CardTitle>
          <CardDescription>Change your password and manage account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Enter new password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input id="confirmNewPassword" type="password" placeholder="Confirm new password" />
          </div>
           <Button onClick={() => handleSaveChanges("Password")}>Change Password</Button>
        </CardContent>
      </Card>
      
       <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-primary"/> Preferences</CardTitle>
          <CardDescription>Customize your experience on the portal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive email updates for course announcements and results.
                    </p>
                </div>
                <Switch id="emailNotifications" defaultChecked/>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <Label htmlFor="darkModeStudent" className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                        Switch to a dark theme for comfortable viewing. (Feature in progress)
                    </p>
                </div>
                <Switch id="darkModeStudent" />
            </div>
          <Button onClick={() => handleSaveChanges("Preferences")}>Save Preferences</Button>
        </CardContent>
      </Card>

    </div>
  );
}
