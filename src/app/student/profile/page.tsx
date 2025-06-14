"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Mail, Phone, Home, GraduationCap, CalendarDays, Edit3, ShieldCheck, FileText, Link as LinkIcon, Download } from "lucide-react";
import Link from "next/link";

// Dummy student data - replace with actual data fetching
const studentData = {
  id: "STU1001",
  name: "Aarav Sharma",
  dob: "15 Aug 2002",
  email: "aarav.sharma@example.com",
  phone: "+91 98765 43210",
  address: "123, MG Road, Ghazipur, UP",
  photoUrl: "https://placehold.co/150x150.png?text=AS",
  course: "D.Pharma",
  enrollmentDate: "01 Jul 2023",
  batch: "2023-2025",
  programType: "degree" as "degree" | "certificate",
  certificateStatus: "Issued & Verified",
  certificateLink: "https://placehold.co/800x600.png?text=Certificate", // Placeholder link
  semesters: [
    { name: "Semester 1", status: "Passed", marksLink: "https://placehold.co/800x600.png?text=S1+Marks" },
    { name: "Semester 2", status: "Passed", marksLink: "https://placehold.co/800x600.png?text=S2+Marks" },
    { name: "Semester 3", status: "Awaited", marksLink: null },
  ],
};

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
       <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">My Profile</h2>
          <p className="text-muted-foreground">View and manage your personal and academic information.</p>
        </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-2 border-primary shadow-md">
              <AvatarImage src={studentData.photoUrl} alt={studentData.name} data-ai-hint="student avatar" />
              <AvatarFallback>{studentData.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-headline">{studentData.name}</CardTitle>
            <CardDescription>{studentData.id} | {studentData.course}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{studentData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{studentData.phone}</span>
            </div>
            <div className="flex items-start">
              <Home className="w-4 h-4 mr-2 mt-1 text-muted-foreground" />
              <span>{studentData.address}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>DOB: {studentData.dob}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>Enrolled: {studentData.enrollmentDate} (Batch: {studentData.batch})</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button variant="outline" className="w-full"><Edit3 className="mr-2 h-4 w-4" /> Request Profile Update</Button>
            <Button variant="ghost" className="w-full text-primary">Change Password</Button>
          </CardFooter>
        </Card>

        {/* Academic & Certificate Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center font-headline">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-600" /> Certificate Status
              </CardTitle>
              <CardDescription>Your final certificate information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
                <div>
                  <p className="font-semibold">{studentData.certificateStatus}</p>
                  <p className="text-xs text-muted-foreground">Program Type: <span className="capitalize">{studentData.programType}</span></p>
                </div>
                {studentData.certificateLink && (
                  <Button asChild>
                    <Link href={studentData.certificateLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> View Certificate
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {studentData.programType === "degree" && studentData.semesters && studentData.semesters.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center font-headline">
                  <FileText className="w-5 h-5 mr-2 text-primary" /> Semester Results
                </CardTitle>
                <CardDescription>Your semester-wise academic performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semester</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Marksheet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.semesters.map((semester) => (
                      <TableRow key={semester.name}>
                        <TableCell className="font-medium">{semester.name}</TableCell>
                        <TableCell>
                          <Badge variant={semester.status === "Passed" ? "default" : semester.status === "Awaited" ? "secondary" : "destructive"} 
                                 className={semester.status === "Passed" ? "bg-green-600 hover:bg-green-700 text-white" : ""}>
                            {semester.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {semester.marksLink ? (
                            <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
                              <Link href={semester.marksLink} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="mr-1 h-3 w-3" /> View
                              </Link>
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">Not Available</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
       <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Support & Enquiries</CardTitle>
            <CardDescription>Need help or have questions? Reach out to us.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              If you have any questions regarding your profile, academic records, or any other concerns, please use the contact form.
            </p>
            <Button asChild>
                <Link href="/contact?subject=student_query&student_id=STU1001">Contact Support</Link>
            </Button>
          </CardContent>
        </Card>
    </div>
  );
}
