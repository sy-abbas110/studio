import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, School } from 'lucide-react'; // Using School as a placeholder logo

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses-overview', label: 'Courses' }, // Public view of courses
  { href: '/contact', label: 'Contact Us' },
];

const authLinks = [
  { href: '/auth/login', label: 'Login', variant: 'outline' as const },
  { href: '/auth/admin-register', label: 'Admin Register', variant: 'default' as const },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-primary">
            Jai Bharat Management Hub
          </span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden flex-1 items-center justify-end space-x-2 md:flex">
          {authLinks.map((link) => (
            <Button key={link.label} asChild variant={link.variant} size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
        <div className="md:hidden flex flex-1 justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60 text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                {authLinks.map((link) => (
                  <Button key={link.label} asChild variant={link.variant} className="w-full">
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
