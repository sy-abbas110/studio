
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";
import Link from 'next/link';

interface PublicCertificateRecord {
  id: string;
  studentName: string;
  studentId: string; // Consider if this should be public or a non-sensitive display ID
  courseName: string;
  issueDate: string;
  status: "Issued" | "Verified"; // Only show publicly verifiable statuses
  certificateLink?: string; // Link to view/verify certificate
}

// Using a subset of initialCertificates data for public view
// In a real app, this would come from a secure, filtered backend API call
const publicCertificatesData: PublicCertificateRecord[] = [
  { id: "CERT001", studentName: "Aarav Sharma", studentId: "STU1001", courseName: "D.Pharma", issueDate: "2025-06-15", status: "Verified", certificateLink: "https://placehold.co/800x560/E6E6FA/4B0082?text=D.Pharma+CERT001" },
  { id: "CERT002", studentName: "Priya Singh", studentId: "STU1002", courseName: "BAMS", issueDate: "2027-12-01", status: "Issued", certificateLink: "https://placehold.co/800x560/E6E6FA/4B0082?text=BAMS+CERT002" },
  // { id: "CERT003", studentName: "Rohan Verma", studentId: "STU1003", courseName: "GNM", issueDate: "2024-07-20", status: "Pending Verification", certificateLink: "#" }, // Pending might not be public
  // { id: "CERT004", studentName: "Invalid User", studentId: "STUXXXX", courseName: "Fake Course", issueDate: "2023-01-01", status: "Revoked", certificateLink: "#" }, // Revoked definitely not public
];


export default function PublicCertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = useMemo(() => {
    if (!searchTerm) return publicCertificatesData;
    return publicCertificatesData.filter(cert =>
      cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },[searchTerm]);

  return (
    <div className="container mx-auto py-12 md:py-20 px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">Certificate Directory</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Verify the authenticity of certificates issued by the institute.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by Certificate ID, Student Name, Student ID, or Course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full text-base"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Issued Certificates</CardTitle>
          <CardDescription>Showing {filteredCertificates.length} of {publicCertificatesData.length} publicly listed certificates.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length > 0 ? filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.id}</TableCell>
                  <TableCell>{cert.studentId}</TableCell>
                  <TableCell>{cert.studentName}</TableCell>
                  <TableCell>{cert.courseName}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>
                    <Badge variant={cert.status === "Verified" ? "default" : "secondary"}
                           className={cert.status === "Verified" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-500 text-white"}>
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {cert.certificateLink ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={cert.certificateLink} target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-1 h-4 w-4" /> View
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">No Link</span>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">No certificates found matching your criteria.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <p className="text-center text-sm text-muted-foreground mt-8">
        This directory is for quick reference. For official verification, please use the QR code on the certificate or contact the institute.
      </p>
    </div>
  );
}
