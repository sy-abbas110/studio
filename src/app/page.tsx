import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BookOpen, Users, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const featuredCourses = [
  { name: 'D.Pharma', description: 'Diploma in Pharmacy program.', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { name: 'BAMS', description: 'Bachelor of Ayurvedic Medicine and Surgery.', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { name: 'GNM', description: 'General Nursing and Midwifery.', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { name: 'ITI Courses', description: 'Fitter, Electrician, Welder, Computer.', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { name: 'B.Ed.', description: 'Bachelor of Education program.', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { name: 'Polytechnic', description: 'Diplomas in Civil, Mechanical, Electrical.', icon: <GraduationCap className="w-8 h-8 text-primary" /> },
];

const instituteValues = [
  { title: "Quality Education", description: "Commitment to providing the highest standards of education and training.", icon: <BookOpen className="w-8 h-8 text-accent" /> },
  { title: "Experienced Faculty", description: "Learn from industry experts and seasoned academicians.", icon: <Users className="w-8 h-8 text-accent" /> },
  { title: "Career Focused", description: "Programs designed to equip students for successful careers.", icon: <CheckCircle className="w-8 h-8 text-accent" /> },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <Image 
            src="https://placehold.co/150x150.png?text=JBIM+Logo"
            alt="Institute Logo" 
            width={120} 
            height={120} 
            className="mx-auto mb-6 rounded-full shadow-lg"
            data-ai-hint="institute logo"
          />
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4 tracking-tight">
            Jai Bharat Paramedical Institute of Management Groups, Ghazipur
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Empowering students with quality education and practical skills for a successful future in paramedical and management fields.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/auth/login?role=student">Enroll Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/auth/login?role=admin">Admin Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-full py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-primary mb-12">About Our Institute</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Institute Building" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-xl"
                data-ai-hint="institute building"
              />
            </div>
            <div className="space-y-4">
              <p className="text-lg text-foreground">
                Jai Bharat Paramedical Institute of Management Groups, located in Ghazipur, is a premier institution dedicated to providing top-notch education in paramedical sciences and management. Established with a vision to create skilled professionals, we offer a wide array of courses tailored to meet industry demands.
              </p>
              <p className="text-lg text-foreground">
                Our state-of-the-art facilities, experienced faculty, and a curriculum that blends theoretical knowledge with practical exposure ensure our students are well-prepared for their careers. We focus on holistic development, nurturing not just academic excellence but also ethical values and leadership qualities.
              </p>
              <ul className="space-y-3 mt-6">
                {instituteValues.map(value => (
                  <li key={value.title} className="flex items-start space-x-3 p-3 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex-shrink-0">{value.icon}</div>
                    <div>
                      <h3 className="font-semibold text-primary">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center text-primary mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.name} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">{course.icon}</div>
                  <CardTitle className="text-xl font-headline">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{course.description}</CardDescription>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
                    <Link href="/courses-overview">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/courses-overview">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Join Jai Bharat Institute and take the first step towards a rewarding career. Explore our programs or get in touch with our admissions team.
          </p>
          <div className="space-x-4">
            <Button variant="secondary" size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/auth/login?role=student">Apply for a Course</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href="/contact">Contact Admissions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
