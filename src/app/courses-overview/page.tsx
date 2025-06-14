import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const allCourses = [
  { name: 'D.Pharma (Diploma in Pharmacy)', description: 'A 2-year diploma program focusing on pharmaceutical sciences, drug formulation, and patient care.', duration: "2 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)', description: 'A 5.5-year undergraduate degree program integrating traditional Ayurvedic medicine with modern medical sciences.', duration: "5.5 Years", type: "Degree", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'GNM (General Nursing and Midwifery)', description: 'A 3-year diploma course preparing students for roles in general nursing and midwifery care.', duration: "3 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'ANM (Auxiliary Nursing Midwifery)', description: 'A 2-year diploma program focused on community health nursing and maternal child health.', duration: "2 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'ITI - Fitter', description: 'Industrial Training Institute course for Fitter trade, focusing on machine assembly and maintenance.', duration: "2 Years", type: "Certificate", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'ITI - Electrician', description: 'ITI course for Electrician trade, covering electrical wiring, equipment, and safety.', duration: "2 Years", type: "Certificate", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'ITI - Welder', description: 'ITI course for Welder trade, teaching various welding techniques and material science.', duration: "1 Year", type: "Certificate", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'ITI - Computer (COPA)', description: 'Computer Operator and Programming Assistant ITI course.', duration: "1 Year", type: "Certificate", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'Yoga Certificate/Diploma', description: 'Programs focused on yoga philosophy, asanas, pranayama, and teaching methodologies.', duration: "Varies", type: "Certificate/Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'CCC (Course on Computer Concepts)', description: 'A foundational course on computer literacy and basic applications by NIELIT.', duration: "80 Hours", type: "Certificate", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'B.Ed. (Bachelor of Education)', description: 'A 2-year professional degree program for aspiring teachers.', duration: "2 Years", type: "Degree", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'D.El.Ed (Diploma in Elementary Education)', description: 'A 2-year diploma program for elementary school teachers.', duration: "2 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'Polytechnic - Civil Engineering', description: 'Diploma in Civil Engineering focusing on construction, design, and infrastructure.', duration: "3 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'Polytechnic - Mechanical Engineering', description: 'Diploma in Mechanical Engineering covering machine design, manufacturing, and thermodynamics.', duration: "3 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
  { name: 'Polytechnic - Electrical Engineering', description: 'Diploma in Electrical Engineering focusing on power systems, electronics, and control systems.', duration: "3 Years", type: "Diploma", icon: <GraduationCap className="w-10 h-10 text-primary" /> },
];


export default function CoursesOverviewPage() {
  return (
    <div className="container mx-auto py-12 md:py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">Our Courses</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore the diverse range of programs offered at Jai Bharat Paramedical Institute of Management Groups, designed to shape your future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCourses.map((course) => (
          <Card key={course.name} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                {course.icon}
                <CardTitle className="text-xl font-headline text-primary">{course.name}</CardTitle>
              </div>
              <div className="flex space-x-2 text-xs">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {course.type}
                </span>
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                  {course.duration}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-foreground/80">{course.description}</CardDescription>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="default" asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={`/contact?course=${encodeURIComponent(course.name)}&subject=Course_Enquiry`}>
                  <Info className="mr-2 h-4 w-4" /> Enquire Now
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold font-headline text-primary mb-4">Ready to Apply?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Take the next step in your educational journey. Contact our admissions office for more information or to start your application process.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/auth/login?role=student">Enroll in a Course</Link>
        </Button>
      </div>
    </div>
  );
}
