"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Search, Eye, Download, CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CertificateRecord {
  id: string;
  studentName: string;
  studentId: string;
  courseName: string;
  issueDate: string;
  status: "Issued" | "Verified" | "Pending Verification" | "Revoked";
  certificateLink?: string; // GDrive link or Firebase Storage path
  qrCodeLink?: string; // Link for QR code verification
}

const initialCertificates: CertificateRecord[] = [
  { id: "CERT001", studentName: "Aarav Sharma", studentId: "STU1001", courseName: "D.Pharma", issueDate: "2025-06-15", status: "Verified", certificateLink: "#", qrCodeLink: "#" },
  { id: "CERT002", studentName: "Priya Singh", studentId: "STU1002", courseName: "BAMS", issueDate: "2027-12-01", status: "Issued", certificateLink: "#" },
  { id: "CERT003", studentName: "Rohan Verma", studentId: "STU1003", courseName: "GNM", issueDate: "2024-07-20", status: "Pending Verification", certificateLink: "#" },
  { id: "CERT004", studentName: "Invalid User", studentId: "STUXXXX", courseName: "Fake Course", issueDate: "2023-01-01", status: "Revoked", certificateLink: "#" },
];


export default function ManageCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>(initialCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredCertificates = certificates.filter(cert =>
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUploadCertificate = (studentId: string) => {
    toast({title: "Upload Certificate", description: `Simulating certificate upload for student ${studentId}.`});
    // Actual upload logic to Firebase Storage / GDrive link update would go here
  };

  const handleVerifyCertificate = (certId: string) => {
     setCertificates(certs => certs.map(c => c.id === certId ? {...c, status: "Verified"} : c));
     toast({title: "Certificate Verified", description: `Certificate ${certId} marked as verified.`});
  };
  
  const handleRevokeCertificate = (certId: string) => {
     setCertificates(certs => certs.map(c => c.id === certId ? {...c, status: "Revoked"} : c));
     toast({title: "Certificate Revoked", description: `Certificate ${certId} has been revoked.`, variant: "destructive"});
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">Certificate Management</h2>
        <p className="text-muted-foreground">Upload, verify, and manage student certificates.</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by Student Name, ID, or Course..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Certificate Records</CardTitle>
          <CardDescription>Total {filteredCertificates.length} certificates found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length > 0 ? filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.studentId}</TableCell>
                  <TableCell>{cert.studentName}</TableCell>
                  <TableCell>{cert.courseName}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      cert.status === "Verified" ? "default" : 
                      cert.status === "Issued" ? "secondary" : 
                      cert.status === "Pending Verification" ? "outline" : "destructive"
                    }
                    className={
                      cert.status === "Verified" ? "bg-green-600 hover:bg-green-700 text-white" :
                      cert.status === "Pending Verification" ? "border-yellow-500 text-yellow-700" : ""
                    }>
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    {cert.certificateLink ? (
                      <>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer" title="View Certificate">
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={cert.certificateLink} download title="Download Certificate">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUploadCertificate(cert.studentId)}>
                        <UploadCloud className="mr-1 h-4 w-4" /> Upload
                      </Button>
                    )}
                    {cert.status === "Pending Verification" && (
                       <Button variant="ghost" size="icon" onClick={() => handleVerifyCertificate(cert.id)} title="Mark as Verified">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                       </Button>
                    )}
                    {cert.status !== "Revoked" && (
                       <Button variant="ghost" size="icon" onClick={() => handleRevokeCertificate(cert.id)} title="Revoke Certificate" className="text-destructive hover:text-destructive/90">
                          <XCircle className="h-4 w-4" />
                       </Button>
                    )}
                    {cert.status === "Revoked" && (
                       <Button variant="ghost" size="icon" onClick={() => { /* Logic to un-revoke or re-issue */ }} title="Re-evaluate Status" className="text-yellow-600 hover:text-yellow-700">
                          <RefreshCcw className="h-4 w-4" />
                       </Button>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">No certificates found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
