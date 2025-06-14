"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, FileText, UploadCloud, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  name: string;
  type: "certificate" | "degree";
  duration: string;
  affiliation?: string;
  brochureLink?: string;
  faculty?: string;
  semesters?: { name: string; marksLink?: string }[];
}

const initialCourses: Course[] = [
  { id: "1", name: "D.Pharma", type: "degree", duration: "2 Years", affiliation: "Board of Technical Education, UP", faculty: "Dr. A. K. Sharma", semesters: [{name: 'Semester 1'}, {name: 'Semester 2'}, {name: 'Semester 3'}, {name: 'Semester 4'}] },
  { id: "2", name: "BAMS", type: "degree", duration: "5.5 Years", affiliation: "Mahayogi Gorakhnath University", faculty: "Dr. R. Singh", semesters: Array.from({length: 9}, (_, i) => ({name: `Semester ${i+1}`})) },
  { id: "3", name: "GNM", type: "degree", duration: "3 Years", affiliation: "UP State Medical Faculty", faculty: "Ms. S. Verma" , semesters: Array.from({length: 6}, (_, i) => ({name: `Semester ${i+1}`}))},
  { id: "4", name: "CCC", type: "certificate", duration: "3 Months", faculty: "Mr. V. Kumar" },
  { id: "5", name: "B.Ed.", type: "degree", duration: "2 Years", affiliation: "Veer Bahadur Singh Purvanchal University", faculty: "Dr. P. Mishra", semesters: Array.from({length: 4}, (_, i) => ({name: `Semester ${i+1}`})) },
];

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSemesterFormOpen, setIsSemesterFormOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [selectedCourseForSemesters, setSelectedCourseForSemesters] = useState<Course | null>(null);
  const { toast } = useToast();

  // Simplified form state for brevity
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [semesterFormData, setSemesterFormData] = useState<{ semesterName?: string; marksLink?: string }>({});


  const handleAddOrEditCourse = () => {
    if (!formData.name || !formData.type || !formData.duration) {
      toast({ title: "Error", description: "Name, Type, and Duration are required.", variant: "destructive" });
      return;
    }
    if (currentCourse) { // Editing
      setCourses(courses.map(c => c.id === currentCourse.id ? { ...c, ...formData } as Course : c));
      toast({ title: "Success", description: "Course updated successfully." });
    } else { // Adding
      const newCourse: Course = { id: String(Date.now()), ...formData } as Course;
      if (newCourse.type === 'degree' && !newCourse.semesters) newCourse.semesters = [];
      setCourses([...courses, newCourse]);
      toast({ title: "Success", description: "Course added successfully." });
    }
    setIsFormOpen(false);
    setFormData({});
    setCurrentCourse(null);
  };
  
  const openEditForm = (course: Course) => {
    setCurrentCourse(course);
    setFormData(course);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setCurrentCourse(null);
    setFormData({ type: 'degree', semesters: [] }); // Default to degree
    setIsFormOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
    toast({ title: "Success", description: "Course deleted successfully." });
  };

  const openSemesterManagement = (course: Course) => {
    setSelectedCourseForSemesters(course);
  };

  const handleAddOrUpdateSemesterMarks = (semesterName: string) => {
    if(!selectedCourseForSemesters) return;
    // In a real app, this would open a dialog to input/update the marks link
    const marksLink = prompt(`Enter marksheet link for ${semesterName} of ${selectedCourseForSemesters.name}:`);
    if(marksLink === null) return; // User cancelled

    setCourses(courses.map(course => {
      if (course.id === selectedCourseForSemesters.id && course.semesters) {
        return {
          ...course,
          semesters: course.semesters.map(sem => 
            sem.name === semesterName ? { ...sem, marksLink } : sem
          )
        };
      }
      return course;
    }));
    toast({ title: "Success", description: `Marksheet link for ${semesterName} updated.` });
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Manage Courses & Programs</h2>
          <p className="text-muted-foreground">Add, edit, or remove courses offered by the institute.</p>
        </div>
        <Button onClick={openAddForm}><PlusCircle className="mr-2 h-4 w-4" /> Add New Course</Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
          <CardDescription>List of all available certificate and degree programs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell className="capitalize">{course.type}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.faculty || 'N/A'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {course.type === 'degree' && (
                       <Button variant="outline" size="sm" onClick={() => openSemesterManagement(course)}>
                        <FileText className="mr-1 h-3 w-3" /> Semesters
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => openEditForm(course)}>
                      <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course.id)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline">{currentCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            <DialogDescription>
              {currentCourse ? "Update details for this course." : "Enter details for the new course."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select value={formData.type || ""} onValueChange={(value) => setFormData({...formData, type: value as "certificate" | "degree"})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="degree">Degree Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">Duration</Label>
              <Input id="duration" value={formData.duration || ""} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty" className="text-right">Faculty Contact</Label>
              <Input id="faculty" value={formData.faculty || ""} onChange={(e) => setFormData({...formData, faculty: e.target.value})} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="affiliation" className="text-right">Affiliation</Label>
              <Input id="affiliation" value={formData.affiliation || ""} onChange={(e) => setFormData({...formData, affiliation: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brochureLink" className="text-right">Brochure (GDrive)</Label>
              <Input id="brochureLink" value={formData.brochureLink || ""} onChange={(e) => setFormData({...formData, brochureLink: e.target.value})} placeholder="https://docs.google.com/..." className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleAddOrEditCourse}>{currentCourse ? "Save Changes" : "Add Course"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Semester Management Dialog */}
      {selectedCourseForSemesters && selectedCourseForSemesters.type === 'degree' && (
        <Dialog open={!!selectedCourseForSemesters} onOpenChange={() => setSelectedCourseForSemesters(null)}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-headline">Manage Semesters for {selectedCourseForSemesters.name}</DialogTitle>
              <DialogDescription>Upload or view semester-wise mark sheets.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto py-4 pr-2">
              <ul className="space-y-3">
              {(selectedCourseForSemesters.semesters || []).map(semester => (
                <li key={semester.name} className="flex items-center justify-between p-3 border rounded-md bg-muted/30 hover:bg-muted/60 transition-colors">
                  <div>
                    <p className="font-medium">{semester.name}</p>
                    {semester.marksLink ? (
                       <Link href={semester.marksLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center">
                         <Eye className="mr-1 h-3 w-3"/> View Marksheet
                       </Link>
                    ) : (
                      <p className="text-xs text-muted-foreground">Marksheet not uploaded</p>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleAddOrUpdateSemesterMarks(semester.name)}>
                    <UploadCloud className="mr-2 h-4 w-4" /> {semester.marksLink ? 'Update Link' : 'Upload Link'}
                  </Button>
                </li>
              ))}
              {(!selectedCourseForSemesters.semesters || selectedCourseForSemesters.semesters.length === 0) && (
                <p className="text-muted-foreground text-center py-4">No semesters defined for this course yet.</p>
              )}
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCourseForSemesters(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
