
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ShieldCheck, AlertTriangle, QrCode, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dummy data for student certificate - replace with actual data fetching
const certificateData = {
  courseName: "D.Pharma (Diploma in Pharmacy)",
  studentName: "Aarav Sharma",
  studentId: "STU1001",
  issueDate: "15 June 2025",
  status: "Verified", // "Pending", "Issued", "Verified", "Revoked"
  certificateImageUrl: "https://placehold.co/800x560/E6E6FA/4B0082?text=D.Pharma+Certificate", // Placeholder image of certificate
  downloadLink: "#", // Actual download link for PDF
  verificationLink: "/verify-certificate?id=CERTXYZ123", // Public verification link
  qrCodeDataUrl: "https://placehold.co/150x150.png?text=QR+Code", // Placeholder for QR code image data URL
};

// const certificateData = null; // Test case for no certificate

export default function StudentCertificatePage() {
  if (!certificateData) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">My Certificate</h2>
          <p className="text-muted-foreground">Your official course completion certificate.</p>
        </div>
        <Card className="shadow-lg">
          <CardContent className="p-10 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certificate Not Yet Issued</h3>
            <p className="text-muted-foreground mb-4">
              Your certificate for the course is not yet available or has not been issued.
              Please check back later or contact the administration if you believe this is an error.
            </p>
            <Button asChild>
              <Link href="/contact?subject=certificate_status_query">Contact Administration</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">My Certificate</h2>
        <p className="text-muted-foreground">Your official course completion certificate for {certificateData.courseName}.</p>
      </div>

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl font-headline text-primary">{certificateData.courseName} - Completion Certificate</CardTitle>
              <CardDescription>Issued to: {certificateData.studentName} (ID: {certificateData.studentId})</CardDescription>
            </div>
            <Badge variant={certificateData.status === "Verified" ? "default" : "secondary"} 
                   className={`text-sm px-3 py-1 ${certificateData.status === "Verified" ? "bg-green-600 text-white" : "bg-yellow-500 text-white"}`}>
                <ShieldCheck className="mr-1.5 h-4 w-4"/> {certificateData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:flex md:space-x-6">
          <div className="md:w-2/3 p-6 md:p-0">
            <div className="aspect-[800/560] w-full bg-gray-200 rounded-md overflow-hidden shadow-inner">
              <Image 
                src={certificateData.certificateImageUrl} 
                alt={`${certificateData.courseName} Certificate for ${certificateData.studentName}`}
                width={800} 
                height={560}
                className="object-contain w-full h-full"
                data-ai-hint="student certificate" 
              />
            </div>
          </div>
          <div className="md:w-1/3 p-6 border-t md:border-t-0 md:border-l space-y-4 bg-background md:bg-transparent">
            <h3 className="font-semibold text-lg">Certificate Details</h3>
            <p className="text-sm"><strong className="text-muted-foreground">Issue Date:</strong> {certificateData.issueDate}</p>
            
            <Button className="w-full bg-primary hover:bg-primary/90" asChild>
              <a href={certificateData.downloadLink} download={`Certificate_${certificateData.studentId}.pdf`}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </a>
            </Button>
            
            <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Verify Certificate</h4>
                <div className="flex items-center space-x-3">
                    {certificateData.qrCodeDataUrl && (
                         <Image 
                            src={certificateData.qrCodeDataUrl} 
                            alt="Certificate Verification QR Code" 
                            width={80} 
                            height={80} 
                            className="rounded border p-0.5"
                            data-ai-hint="qr code"
                        />
                    )}
                    <p className="text-xs text-muted-foreground">
                        Scan the QR code or use the link below to verify this certificate's authenticity.
                    </p>
                </div>
                {certificateData.verificationLink && (
                    <Button variant="link" className="p-0 h-auto mt-2 text-primary text-sm" asChild>
                        <Link href={certificateData.verificationLink} target="_blank">
                            <LinkIcon className="mr-1 h-3 w-3" /> View Verification Page
                        </Link>
                    </Button>
                )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 border-t">
            <p className="text-xs text-muted-foreground">
                This is a digitally generated certificate. For any queries regarding its authenticity, please contact the institute administration.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}

