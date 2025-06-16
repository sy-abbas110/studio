
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from '@/components/ui/badge';

interface PublicStudent {
  id: string; // Consider if this should be public or a non-sensitive display ID
  name: string;
  course: string;
  batch: string;
  programType: "degree" | "certificate";
  status: "Active" | "Graduated" | "Enrolled"; // Simplified status for public view
}

// Using a subset of initialStudents data for public view
// In a real app, this would come from a secure, filtered backend API call
const publicStudentsData: PublicStudent[] = [
  { id: "STU1001", name: "Aarav Sharma", course: "D.Pharma", batch: "2023-2025", programType: "degree", status: "Active" },
  { id: "STU1002", name: "Priya Singh", course: "BAMS", batch: "2022-2027", programType: "degree", status: "Active" },
  { id: "STU1003", name: "Rohan Verma", course: "GNM", batch: "2021-2024", programType: "degree", status: "Graduated" },
  { id: "STU1004", name: "Sneha Gupta", course: "CCC", batch: "2024-Jan", programType: "certificate", status: "Active" },
  // { id: "STU1005", name: "Mohit Kumar", course: "ITI - Electrician", batch: "2023-2025", status: "Archived", programType: "certificate" }, // Archived might not be public
];


export default function PublicStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return publicStudentsData;
    return publicStudentsData.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.batch.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">Student Directory</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Find information about students enrolled in various programs.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by Name, Course, Student ID, or Batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full text-base"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
          <CardDescription>Showing {filteredStudents.length} of {publicStudentsData.length} students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Program Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell className="capitalize">{student.programType}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" || student.status === "Enrolled" ? "default" : "secondary"}
                           className={student.status === "Active" || student.status === "Enrolled" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                        {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">No students found matching your criteria.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground mt-8">
        For official verification or complete details, please contact the institute administration.
      </p>
    </div>
  );
}
