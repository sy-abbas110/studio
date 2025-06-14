"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, User, Mail, Phone, Home, Users, BookCopy, Image as ImageIcon, GraduationCap, Hash } from "lucide-react";

const courses = [
  "D.Pharma", "BAMS", "GNM", "ANM", 
  "ITI - Fitter", "ITI - Electrician", "ITI - Welder", "ITI - Computer",
  "Yoga Certificate", "CCC (Course on Computer Concepts)", 
  "B.Ed.", "D.El.Ed", 
  "Polytechnic - Civil", "Polytechnic - Mechanical", "Polytechnic - Electrical"
];

const studentEnrollmentSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  dob: z.date({ required_error: "Date of birth is required." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, { message: "Phone number too long."}),
  address: z.string().min(5, { message: "Address is too short." }),
  parentName: z.string().min(2, { message: "Parent/Guardian name is required." }),
  parentPhone: z.string().min(10, { message: "Parent/Guardian phone is required." }),
  course: z.string({ required_error: "Please select a course." }),
  enrollmentDate: z.date({ required_error: "Enrollment date is required." }),
  batch: z.string().min(2, { message: "Batch information is required (e.g., 2023-2025)." }),
  programType: z.enum(["certificate", "degree"], { required_error: "Program type is required." }),
  studentPhoto: z.any().optional(), // Placeholder for file upload
  isBackfill: z.boolean().default(false),
  previousRecordsNotes: z.string().optional(),
});

type StudentEnrollmentFormValues = z.infer<typeof studentEnrollmentSchema>;

export default function EnrollStudentPage() {
  const { toast } = useToast();
  const form = useForm<StudentEnrollmentFormValues>({
    resolver: zodResolver(studentEnrollmentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      parentName: "",
      parentPhone: "",
      batch: "",
      programType: undefined, // Default to undefined
      isBackfill: false,
      previousRecordsNotes: "",
    },
  });

  function onSubmit(values: StudentEnrollmentFormValues) {
    console.log("Student Enrollment Data:", values);
    // Simulate API call
    toast({
      title: "Enrollment Submitted",
      description: `Student ${values.fullName} enrollment data received. Photo: ${values.studentPhoto ? values.studentPhoto.name : 'Not uploaded'}`,
    });
    form.reset(); // Reset form after submission
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Student Enrollment Form</CardTitle>
        <CardDescription>Add new student details or input data from old records.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl><Input placeholder="Student's full name" {...field} className="pl-10" /></FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                     <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl><Input placeholder="student@example.com" {...field} className="pl-10" /></FormControl>
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
                    <FormLabel>Phone Number</FormLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl><Input placeholder="Student's contact number" {...field} className="pl-10" /></FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <div className="relative">
                    <Home className="absolute left-3 top-4 -translate-y-0 h-4 w-4 text-muted-foreground" />
                    <FormControl><Textarea placeholder="Student's complete address" {...field} className="pl-10" /></FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent/Guardian Name</FormLabel>
                     <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl><Input placeholder="Parent/Guardian's full name" {...field} className="pl-10" /></FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent/Guardian Phone</FormLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl><Input placeholder="Parent/Guardian's contact" {...field} className="pl-10" /></FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 items-end">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                     <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="pl-10"><SelectValue placeholder="Select a course" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {courses.map(courseName => (
                            <SelectItem key={courseName} value={courseName}>{courseName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enrollmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Enrollment Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class/Batch</FormLabel>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl><Input placeholder="e.g., 2023-A or 2023-2025" {...field} className="pl-10" /></FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Program Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="certificate" /></FormControl>
                          <FormLabel className="font-normal">Certificate Course</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="degree" /></FormControl>
                          <FormLabel className="font-normal">Degree Program</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="studentPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Photo</FormLabel>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
                        className="pl-10 file:text-sm file:font-medium file:text-primary file:bg-transparent file:border-0 hover:file:text-primary/80"
                      />
                    </FormControl>
                  </div>
                  <FormDescription>Upload a clear passport-size photograph.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isBackfill"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      This is an entry from old (hand-written) records
                    </FormLabel>
                    <FormDescription>
                      Check this if you are entering data from previous physical registers.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("isBackfill") && (
              <FormField
                control={form.control}
                name="previousRecordsNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes from Previous Records (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific notes or details from the old records, e.g., original enrollment number, remarks, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">Enroll Student</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
