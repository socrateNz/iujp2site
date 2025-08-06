"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  School
} from 'lucide-react';
import Link from 'next/link';
import { SessionProvider } from "next-auth/react";
import { Skeleton } from '@/components/ui/skeleton';
import { ContactMessage } from '@/lib/types';
import Loading from '../loading';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavigationItem[] = [
  { name: 'Tableau de bord', href: '/admin', icon: Home },
  { name: 'Utilisateurs', href: '/admin/users', icon: Users },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Ecoles', href: '/admin/ecoles', icon: School },
  { name: 'Filieres', href: '/admin/filieres', icon: FileText },
  { name: 'Messages', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Paramètres', href: '/admin/parametres', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
    } else if (session.user.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/admin/contacts');
        const data = await response.json();

        if (data.success) {
          setContacts(data.data.contacts || data.data);
        }
      } catch (error) {
        console.error('Erreur récupération contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const isActive = (href: string) => {
    if (!isClient) return false;
    return pathname === href || (href !== '/admin' && pathname?.startsWith(href));
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  if (status === 'loading' || !isClient) {
    return <AdminSkeleton />;
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  const newMessagesCount = contacts.filter(contact => contact.status === "new").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <MobileSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        isActive={isActive}
        newMessagesCount={newMessagesCount}
        handleSignOut={handleSignOut}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar 
        isActive={isActive}
        newMessagesCount={newMessagesCount}
        handleSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <Header 
          setSidebarOpen={setSidebarOpen}
          handleSignOut={handleSignOut}
          userName={session.user.name}
        />

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Component for Mobile Sidebar
function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,
  isActive,
  newMessagesCount,
  handleSignOut
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isActive: (href: string) => boolean;
  newMessagesCount: number;
  handleSignOut: () => void;
}) {
  return (
    <div className={`lg:hidden ${sidebarOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
      <div
        className="fixed inset-0 bg-gray-600/75"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-lg">
        <div className="flex h-16 items-center justify-between px-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
              {item.name === 'Messages' && newMessagesCount > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  {newMessagesCount}
                </span>
              )}
              {isActive(item.href) && item.name !== 'Messages' && (
                <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
              )}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}

// Component for Desktop Sidebar
function DesktopSidebar({
  isActive,
  newMessagesCount,
  handleSignOut
}: {
  isActive: (href: string) => boolean;
  newMessagesCount: number;
  handleSignOut: () => void;
}) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Admin UIJP II</h1>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
              {item.name === 'Messages' && newMessagesCount > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  {newMessagesCount}
                </span>
              )}
              {isActive(item.href) && item.name !== 'Messages' && (
                <span className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
              )}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}

// Component for Header
function Header({
  setSidebarOpen,
  handleSignOut,
  userName
}: {
  setSidebarOpen: (open: boolean) => void;
  handleSignOut: () => void;
  userName: string;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
          <div className="flex items-center gap-x-4">
            <span className="text-sm text-gray-700">
              {userName}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={handleSignOut}
              aria-label="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Skeleton Loading Component
function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="flex flex-1 justify-end">
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <Skeleton className="h-10 w-1/3 rounded-md" />
              <Skeleton className="h-64 w-full rounded-md" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}