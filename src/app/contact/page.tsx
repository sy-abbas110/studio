"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import Image from "next/image";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal('')),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log("Contact Form Data:", values);
    // Simulate API call
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 sm:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-3xl font-headline text-primary">Get in Touch</CardTitle>
                <CardDescription>We'd love to hear from you. Fill out the form or use the contact details below.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                           <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl><Input placeholder="Your Name" {...field} className="pl-10" /></FormControl>
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
                          <FormLabel>Email Address</FormLabel>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl><Input type="email" placeholder="your.email@example.com" {...field} className="pl-10" /></FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <FormControl><Input type="tel" placeholder="+91 12345 67890" {...field} className="pl-10" /></FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl><Input placeholder="Enquiry about..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-4 -translate-y-0 h-4 w-4 text-muted-foreground" />
                            <FormControl><Textarea placeholder="Type your message here..." {...field} rows={5} className="pl-10" /></FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </div>
            <div className="bg-primary/5 p-6 sm:p-8 flex flex-col justify-center">
              <Image 
                src="https://placehold.co/400x300/E6E6FA/4B0082?text=Contact+Us"
                alt="Contact illustration"
                width={400}
                height={300}
                className="rounded-lg mb-6 mx-auto shadow-md"
                data-ai-hint="contact illustration"
              />
              <h3 className="text-xl font-semibold font-headline text-primary mb-4">Contact Information</h3>
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Address:</strong> Jai Bharat Paramedical Institute of Management Groups, Ghazipur, Uttar Pradesh, India
              </p>
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Phone:</strong> +91 XXXX XXX XXX (Replace with actual number)
              </p>
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Email:</strong> info@jbi.ac.in (Replace with actual email)
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Office Hours:</strong> Mon - Sat, 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
