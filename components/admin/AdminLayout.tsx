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
  // { name: 'Paramètres', href: '/admin/parametres', icon: Settings },
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
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-slate-900 shadow-xl transition-transform duration-300 ease-in-out">
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">UI</span>
            </div>
            <span className="text-white font-semibold">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${active
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'
                  }`} />
                {item.name}
                {item.name === 'Messages' && newMessagesCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold shadow-sm">
                    {newMessagesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
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
      <div className="flex flex-col flex-grow bg-slate-900 text-white shadow-xl">
        <div className="flex h-16 items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <School className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">UIJP II</h1>
              <p className="text-[10px] text-slate-400 font-medium">Administration</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6 overflow-y-auto no-scrollbar">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Menu Principal
          </div>
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                  }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'
                  }`} />
                {item.name}
                {item.name === 'Messages' && newMessagesCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold shadow-sm">
                    {newMessagesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="mb-4 px-2">
            <div className="rounded-xl bg-slate-800 p-4">
              <p className="text-xs text-slate-400 mb-2">Besoin d'aide ?</p>
              <Link href={"https://portfolio-socrate.vercel.app/fr#contact"} className="text-xs font-medium text-slate-300">Contactez le support technique</Link>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
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
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
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
        <div className="flex flex-1 items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Tableau de bord
          </h2>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900 leading-none">
                {userName}
              </span>
              <span className="text-xs text-gray-500 mt-1">Administrateur</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
              <Users className="h-4 w-4 text-blue-600" />
            </div>

            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
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