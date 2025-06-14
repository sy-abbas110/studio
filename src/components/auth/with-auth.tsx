// src/components/auth/with-auth.tsx
"use client";

import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

// Define your allowed admin emails here
// In a real application, this might come from a database or environment variables
const ALLOWED_ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS || "admin@jbi.ac.in,testadmin@example.com").split(',');


interface WithAuthProps {
  // You can add any props specific to your HOC here
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: Array<'admin' | 'student'>
) => {
  const ComponentWithAuth = (props: P & WithAuthProps) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!loading && !user) {
        const loginPath = allowedRoles.includes('admin') ? '/auth/login?role=admin' : '/auth/login?role=student';
        router.replace(`${loginPath}&redirect=${pathname}`);
      }
    }, [user, loading, router, pathname, allowedRoles]);

    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading...</p>
        </div>
      );
    }

    if (!user) {
      // Router.replace should have handled this, but as a fallback
      return null; 
    }

    if (allowedRoles.includes('admin') && user.email && !ALLOWED_ADMIN_EMAILS.includes(user.email)) {
       return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
          <h1 className="text-3xl font-bold text-destructive mb-4">Access Denied</h1>
          <p className="text-lg text-muted-foreground mb-6">You do not have permission to access this page.</p>
          <button
            onClick={() => router.push('/auth/login?role=admin')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Login as Admin
          </button>
        </div>
      );
    }
    
    // Add student role check if needed in future

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return ComponentWithAuth;
};

function getDisplayName<P>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
