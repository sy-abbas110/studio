import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Jai Bharat Paramedical Institute of Management Groups, Ghazipur. All rights reserved.</p>
        <p className="mt-1">
          Developed for streamlined student management.
        </p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
