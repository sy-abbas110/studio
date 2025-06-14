
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Download, Info } from "lucide-react";
import Link from "next/link";

// Dummy student course data - replace with actual data fetching
const studentCoursesData = [
  {
    id: "COURSE001",
    name: "D.Pharma (Diploma in Pharmacy)",
    status: "Ongoing",
    progress: 60, // Percentage
    enrollmentDate: "01 Jul 2023",
    expectedCompletion: "30 Jun 2025",
    faculty: "Dr. A. K. Sharma",
    description: "A comprehensive 2-year diploma program focusing on pharmaceutical sciences, drug formulation, and patient care. Covers key subjects like Pharmaceutics, Pharmacology, Pharmaceutical Chemistry, and Pharmacognosy.",
    syllabusLink: "#", // Placeholder
  },
  {
    id: "COURSE002",
    name: "Basic Computer Skills Workshop",
    status: "Completed",
    progress: 100,
    enrollmentDate: "15 Jan 2023",
    expectedCompletion: "15 Mar 2023",
    faculty: "Mr. V. Kumar",
    description: "A short-term workshop covering essential computer operations, MS Office suite, and internet usage.",
    certificateLink: "#", // Placeholder
  }
];

export default function StudentMyCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">My Courses</h2>
        <p className="text-muted-foreground">An overview of courses you are enrolled in or have completed.</p>
      </div>

      {studentCoursesData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {studentCoursesData.map((course) => (
            <Card key={course.id} className="shadow-lg flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-headline text-primary">{course.name}</CardTitle>
                  <Badge variant={course.status === "Ongoing" ? "default" : "secondary"} 
                         className={course.status === "Ongoing" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}>
                    {course.status}
                  </Badge>
                </div>
                <CardDescription>Enrolled: {course.enrollmentDate}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <p className="text-sm text-foreground/80">{course.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" /> Faculty: {course.faculty}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" /> Expected Completion: {course.expectedCompletion}
                </div>
                {course.status === "Ongoing" && (
                  <div>
                    <Label htmlFor={`progress-${course.id}`} className="text-xs text-muted-foreground">Progress</Label>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <p className="text-xs text-right text-primary font-medium">{course.progress}% Complete</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 space-x-2">
                {course.syllabusLink && (
                  <Button variant="outline" asChild>
                    <Link href={course.syllabusLink} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 h-4 w-4" /> View Syllabus
                    </Link>
                  </Button>
                )}
                {course.status === "Completed" && course.certificateLink && (
                  <Button variant="default" asChild className="bg-green-600 hover:bg-green-700">
                    <Link href={course.certificateLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download Certificate
                    </Link>
                  </Button>
                )}
                 {course.status === "Ongoing" && (
                   <Button variant="link" asChild className="text-primary">
                    <Link href={`/student/results?course=${course.id}`}>
                      View Marks / Assignments
                    </Link>
                  </Button>
                 )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-10 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
            <p className="text-muted-foreground mb-4">You are not currently enrolled in any courses, or your completed courses are not listed yet.</p>
            <Button asChild>
              <Link href="/courses-overview"><Info className="mr-2 h-4 w-4"/> Explore Courses</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Minimal Label component if not using ShadCN form for progress
const Label = ({ htmlFor, children, className }: {htmlFor?: string, children: React.ReactNode, className?:string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}>
    {children}
  </label>
);

