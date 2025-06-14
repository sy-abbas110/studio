// src/app/auth/admin-register/page.tsx
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
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from 'next/navigation';

const adminRegisterSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }).refine(
    email => (process.env.NEXT_PUBLIC_ADMIN_EMAIL_DOMAIN ? email.endsWith(process.env.NEXT_PUBLIC_ADMIN_EMAIL_DOMAIN) : true),
    { message: "Email must be from the allowed institute domain (e.g. @jbi.ac.in)." }
  ),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type AdminRegisterFormValues = z.infer<typeof adminRegisterSchema>;

export default function AdminRegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const form = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AdminRegisterFormValues) {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(userCredential.user, { displayName: values.fullName });
      
      // Send verification email
      // Ensure actionCodeSettings are configured in your Firebase console for the verification link
      await sendEmailVerification(userCredential.user);

      toast({
        title: "Registration Submitted",
        description: "Account created. Please check your email to verify your address. Your account will require admin approval before you can log in.",
      });
      setRegistrationSuccess(true);
      form.reset();
      // Optionally redirect or clear form
      // router.push('/auth/login?role=admin&message=registration_pending_approval');
    } catch (error: any) {
      console.error("Registration error: ", error);
      let errorMessage = "Failed to register. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email address is already in use.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "The password is too weak.";
      }
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (registrationSuccess) {
    return (
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Registration Submitted</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Thank you for registering. A verification email has been sent to <strong className="text-primary">{form.getValues("email") || "your email"}</strong>. Please verify your email address.</p>
          <p className="mb-4">Your account also requires manual approval from an administrator. You will be notified once your account is active.</p>
          <Button asChild>
            <Link href="/auth/login?role=admin">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    );
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
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="Your full name" {...field} className="pl-10" disabled={isSubmitting}/>
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
                      <Input placeholder="admin@jbi.ac.in" {...field} className="pl-10" disabled={isSubmitting}/>
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
                      <Input type="password" placeholder="********" {...field} className="pl-10" disabled={isSubmitting}/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register Admin Account
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login?role=admin" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
