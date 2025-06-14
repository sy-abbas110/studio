"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit, Trash2, Search, Filter, FileDown } from "lucide-react";
import Link from "next/link";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  course: string;
  batch: string;
  enrollmentDate: string;
  status: "Active" | "Archived" | "Graduated";
  programType: "degree" | "certificate";
}

const initialStudents: Student[] = [
  { id: "STU1001", name: "Aarav Sharma", course: "D.Pharma", batch: "2023-2025", enrollmentDate: "2023-07-01", status: "Active", programType: "degree" },
  { id: "STU1002", name: "Priya Singh", course: "BAMS", batch: "2022-2027", enrollmentDate: "2022-08-15", status: "Active", programType: "degree" },
  { id: "STU1003", name: "Rohan Verma", course: "GNM", batch: "2021-2024", enrollmentDate: "2021-09-01", status: "Graduated", programType: "degree" },
  { id: "STU1004", name: "Sneha Gupta", course: "CCC", batch: "2024-Jan", enrollmentDate: "2024-01-10", status: "Active", programType: "certificate" },
  { id: "STU1005", name: "Mohit Kumar", course: "ITI - Electrician", batch: "2023-2025", enrollmentDate: "2023-06-20", status: "Archived", programType: "certificate" },
];

const courseOptions = ["All", "D.Pharma", "BAMS", "GNM", "CCC", "ITI - Electrician", "B.Ed."]; // Example courses
const statusOptions = ["All", "Active", "Archived", "Graduated"];

export default function ManageStudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const { toast } = useToast();

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCourse === "All" || student.course === filterCourse) &&
    (filterStatus === "All" || student.status === filterStatus)
  );

  const handleArchiveStudent = (studentId: string) => {
    setStudents(students.map(s => s.id === studentId ? {...s, status: "Archived"} : s));
    toast({ title: "Success", description: "Student archived." });
  };

  const handleDeleteStudent = (studentId: string) => {
    // This should be a soft delete or archive in a real app
    setStudents(students.filter(s => s.id !== studentId));
    toast({ title: "Success", description: "Student record (simulated) deleted." });
  };
  
  const exportData = (format: 'csv' | 'pdf') => {
    toast({ title: "Exporting Data", description: `Simulating export of student data as ${format.toUpperCase()}.` });
    // Actual export logic would go here
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Manage Students</h2>
          <p className="text-muted-foreground">View, edit, and manage student records.</p>
        </div>
        <div className="flex space-x-2">
         <Link href="/admin/enroll-student">
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Enroll New Student</Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-4 md:space-y-0 md:flex md:flex-row md:items-end md:space-x-4">
          <div className="flex-grow">
            <Label htmlFor="search" className="text-sm font-medium">Search by Name</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="search"
                type="search" 
                placeholder="Search student name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="filterCourse" className="text-sm font-medium">Filter by Course</Label>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger id="filterCourse" className="w-full md:w-[180px]">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filterStatus" className="text-sm font-medium">Filter by Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger id="filterStatus" className="w-full md:w-[150px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
           <Button variant="outline" className="w-full md:w-auto"><Filter className="mr-2 h-4 w-4" /> Apply Filters</Button>
        </CardContent>
      </Card>


      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>Student List</CardTitle>
                <CardDescription>Total {filteredStudents.length} students found.</CardDescription>
            </div>
            <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => exportData('csv')}><FileDown className="mr-2 h-4 w-4"/>Export CSV</Button>
                <Button variant="outline" size="sm" onClick={() => exportData('pdf')}><FileDown className="mr-2 h-4 w-4"/>Export PDF</Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.batch}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : student.status === "Graduated" ? "secondary" : "outline"}
                           className={student.status === "Active" ? "bg-green-100 text-green-800 border-green-300" : student.status === "Graduated" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-yellow-100 text-yellow-800 border-yellow-300"}>
                        {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                     {/* Link to a detailed student view page if available, or edit form */}
                    <Link href={`/admin/student-profile/${student.id}`}>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" /> <span className="sr-only">Edit/View</span>
                        </Button>
                    </Link>
                    {student.status === "Active" && (
                        <Button variant="ghost" size="icon" onClick={() => handleArchiveStudent(student.id)} className="text-yellow-600 hover:text-yellow-700">
                             <Trash2 className="h-4 w-4" /> <span className="sr-only">Archive</span>
                        </Button>
                    )}
                    {student.status === "Archived" && (
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)} className="text-destructive hover:text-destructive/80">
                             <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
                        </Button>
                    )}
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
      {/* TODO: Pagination if many students */}
    </div>
  );
}
