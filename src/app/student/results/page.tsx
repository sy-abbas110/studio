
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Info, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Dummy data for student results - replace with actual data fetching
const resultsData = {
  courseName: "D.Pharma (Diploma in Pharmacy)",
  semesters: [
    { name: "Semester 1", status: "Passed", grade: "A", percentage: "85%", marksLink: "#", examDate: "Dec 2023" },
    { name: "Semester 2", status: "Passed", grade: "A+", percentage: "90%", marksLink: "#", examDate: "Jun 2024" },
    { name: "Semester 3", status: "Result Awaited", grade: "-", percentage: "-", marksLink: null, examDate: "Dec 2024 (Tentative)" },
    { name: "Semester 4", status: "Upcoming", grade: "-", percentage: "-", marksLink: null, examDate: "Jun 2025 (Tentative)" },
  ],
  overallStatus: "Promoted to Year 2",
};

const otherCourseResults = [
    {
        courseName: "Basic Computer Skills Workshop",
        type: "Certificate",
        status: "Completed with Distinction",
        completionDate: "15 Mar 2023",
        certificateLink: "#"
    }
]

export default function StudentResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">My Academic Results</h2>
        <p className="text-muted-foreground">View your semester-wise performance and download marksheets.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-primary">{resultsData.courseName}</CardTitle>
          <CardDescription>Overall Status: <span className="font-semibold text-foreground">{resultsData.overallStatus}</span></CardDescription>
        </CardHeader>
        <CardContent>
          {resultsData.semesters && resultsData.semesters.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semester</TableHead>
                  <TableHead>Exam Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead className="text-right">Marksheet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultsData.semesters.map((semester) => (
                  <TableRow key={semester.name}>
                    <TableCell className="font-medium">{semester.name}</TableCell>
                    <TableCell>{semester.examDate}</TableCell>
                    <TableCell>
                      <Badge variant={
                        semester.status === "Passed" ? "default" : 
                        semester.status === "Result Awaited" ? "secondary" : "outline"
                      }
                      className={
                        semester.status === "Passed" ? "bg-green-600 hover:bg-green-700 text-white" :
                        semester.status === "Result Awaited" ? "bg-yellow-500 text-white" : ""
                      }>
                        {semester.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{semester.grade}</TableCell>
                    <TableCell>{semester.percentage}</TableCell>
                    <TableCell className="text-right">
                      {semester.marksLink ? (
                        <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
                          <Link href={semester.marksLink} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-1 h-3 w-3" /> Download
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
          ) : (
             <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-3" />
                <p className="text-muted-foreground">No semester results available for this course yet.</p>
             </div>
          )}
        </CardContent>
      </Card>
      
      {otherCourseResults.length > 0 && (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Other Certificates / Workshops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {otherCourseResults.map(course => (
                    <div key={course.courseName} className="p-3 border rounded-md bg-muted/30 flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold">{course.courseName} ({course.type})</h4>
                            <p className="text-sm text-muted-foreground">Status: {course.status} (Completed: {course.completionDate})</p>
                        </div>
                        {course.certificateLink && (
                             <Button variant="outline" size="sm" asChild>
                                <Link href={course.certificateLink} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-1 h-3 w-3" /> Certificate
                                </Link>
                            </Button>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
      )}

      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Note:</h4>
              <p className="text-sm text-muted-foreground">
                Official marksheets and certificates will be issued by the institute administration.
                The information displayed here is for reference purposes. In case of any discrepancy, please contact the examination department.
              </p>
              <Button variant="link" asChild className="p-0 h-auto mt-2 text-primary">
                  <Link href="/contact?subject=result_discrepancy">Report Discrepancy</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

