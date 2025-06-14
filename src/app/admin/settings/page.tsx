"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bell, Shield, KeyRound, Palette } from "lucide-react";


export default function AdminSettingsPage() {
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
        <h2 className="text-3xl font-bold tracking-tight font-headline">Admin Settings</h2>
        <p className="text-muted-foreground">Configure institute-wide settings and preferences.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-primary"/> Security Settings</CardTitle>
          <CardDescription>Manage admin access, OTP settings, and password policies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Official Institute Email for OTP</Label>
            <Input id="adminEmail" type="email" defaultValue="approvals@jbi.ac.in" />
            <p className="text-sm text-muted-foreground">This email will receive OTPs for new admin registrations.</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="2fa" className="text-base">Two-Factor Authentication (2FA)</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin accounts. (Future Feature)
              </p>
            </div>
            <Switch id="2fa" disabled />
          </div>
           <Button onClick={() => handleSaveChanges("Security")}>Save Security Settings</Button>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance & Branding</CardTitle>
          <CardDescription>Customize the look and feel of the portal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="instituteName">Institute Full Name</Label>
            <Input id="instituteName" defaultValue="Jai Bharat Paramedical Institute of Management Groups, Ghazipur" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="instituteLogo">Institute Logo URL</Label>
            <Input id="instituteLogo" type="url" placeholder="https://example.com/logo.png" />
            <p className="text-sm text-muted-foreground">Link to your institute's logo image.</p>
          </div>
           <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode" className="text-base">Enable Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Allow users to switch to a dark theme. (Feature in progress)
              </p>
            </div>
            <Switch id="darkMode" defaultChecked={false} /> {/* Can be tied to a theme context later */}
          </div>
          <Button onClick={() => handleSaveChanges("Appearance")}>Save Appearance Settings</Button>
        </CardContent>
      </Card>
      
       <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary"/> Notification Settings</CardTitle>
          <CardDescription>Configure email notifications for various events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">New Student Enrollment</p>
                <Switch defaultChecked/>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">Certificate Issuance</p>
                <Switch defaultChecked/>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">Support Ticket Received</p>
                <Switch />
            </div>
          <Button onClick={() => handleSaveChanges("Notifications")}>Save Notification Settings</Button>
        </CardContent>
      </Card>

    </div>
  );
}
