"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Mail, Lock, User, KeyRound } from 'lucide-react';

const adminRegisterSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }).refine(email => email.endsWith('@jbi.ac.in'), { message: "Email must be an @jbi.ac.in address."}), // Assuming institute email domain
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  otp: z.string().optional(),
});

type AdminRegisterFormValues = z.infer<typeof adminRegisterSchema>;

export default function AdminRegisterPage() {
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      otp: "",
    },
  });

  async function onSubmit(values: AdminRegisterFormValues) {
    if (!otpSent) {
      // Simulate sending OTP
      console.log("Simulating OTP send to:", values.email);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to the institute's official email for verification.",
      });
      form.setFocus("otp");
    } else {
      // Simulate OTP verification and registration
      console.log("Simulating OTP verification and registration for:", values);
      if (values.otp === "123456") { // Simulated OTP
        toast({
          title: "Registration Successful",
          description: "Admin account created. Awaiting final approval.",
        });
        // Reset form or redirect
        form.reset();
        setOtpSent(false);
        // router.push('/auth/login'); // Example redirect
      } else {
        form.setError("otp", { type: "manual", message: "Invalid OTP. Please try again." });
        toast({
          title: "OTP Verification Failed",
          description: "The OTP entered is incorrect.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Admin Registration</CardTitle>
        <CardDescription>Create an admin account for Jai Bharat Management Hub.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!otpSent && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="Your full name" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input placeholder="admin@jbi.ac.in" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {otpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="6-digit OTP" {...field} className="pl-10" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full">
              {otpSent ? 'Verify OTP & Register' : 'Send OTP'}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
