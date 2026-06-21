"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Home,
  School,
  ChevronRight,
  Bell,
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
  description?: string;
}

const navigation: NavigationItem[] = [
  { name: 'Tableau de bord', href: '/admin', icon: Home, description: 'Vue générale' },
  { name: 'Utilisateurs', href: '/admin/users', icon: Users, description: 'Gérer les comptes' },
  { name: 'Articles', href: '/admin/articles', icon: FileText, description: 'Actualités & blog' },
  { name: 'Ecoles', href: '/admin/ecoles', icon: School, description: 'Établissements' },
  { name: 'Filieres', href: '/admin/filieres', icon: FileText, description: 'Programmes' },
  { name: 'Messages', href: '/admin/contacts', icon: MessageSquare, description: 'Contacts' },
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

  const newMessagesCount = contacts.filter(c => c.status === "new").length;
  const userInitials = session.user.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Mobile Sidebar Overlay */}
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isActive={isActive}
        newMessagesCount={newMessagesCount}
        handleSignOut={handleSignOut}
        userInitials={userInitials}
        userName={session.user.name}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar
        isActive={isActive}
        newMessagesCount={newMessagesCount}
        handleSignOut={handleSignOut}
        userInitials={userInitials}
        userName={session.user.name}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72">
        <TopBar
          setSidebarOpen={setSidebarOpen}
          userName={session.user.name}
          userInitials={userInitials}
          newMessagesCount={newMessagesCount}
          handleSignOut={handleSignOut}
          pathname={pathname}
        />
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// ── Mobile Sidebar ────────────────────────────────────────────────────────────
function MobileSidebar({
  sidebarOpen, setSidebarOpen, isActive, newMessagesCount, handleSignOut, userInitials, userName
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isActive: (href: string) => boolean;
  newMessagesCount: number;
  handleSignOut: () => void;
  userInitials: string;
  userName: string;
}) {
  return (
    <div className={`lg:hidden ${sidebarOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-slate-950 shadow-2xl">
        <SidebarContent
          isActive={isActive}
          newMessagesCount={newMessagesCount}
          handleSignOut={handleSignOut}
          userInitials={userInitials}
          userName={userName}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

// ── Desktop Sidebar ───────────────────────────────────────────────────────────
function DesktopSidebar({
  isActive, newMessagesCount, handleSignOut, userInitials, userName
}: {
  isActive: (href: string) => boolean;
  newMessagesCount: number;
  handleSignOut: () => void;
  userInitials: string;
  userName: string;
}) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col z-30">
      <div className="flex flex-col flex-grow bg-slate-950 shadow-2xl overflow-hidden">
        <SidebarContent
          isActive={isActive}
          newMessagesCount={newMessagesCount}
          handleSignOut={handleSignOut}
          userInitials={userInitials}
          userName={userName}
        />
      </div>
    </div>
  );
}

// ── Shared Sidebar Content ────────────────────────────────────────────────────
function SidebarContent({
  isActive, newMessagesCount, handleSignOut, userInitials, userName, onClose
}: {
  isActive: (href: string) => boolean;
  newMessagesCount: number;
  handleSignOut: () => void;
  userInitials: string;
  userName: string;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
            <School className="h-5 w-5 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">UIJP II</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Administration</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 no-scrollbar">
        <p className="px-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Navigation</p>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  {active && (
                    <div className="absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-blue-300" />
                  )}
                  <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{item.name}</p>
                    {item.description && (
                      <p className={`text-[10px] truncate mt-0.5 ${active ? 'text-blue-200' : 'text-slate-500 group-hover:text-slate-400'}`}>{item.description}</p>
                    )}
                  </div>
                  {item.name === 'Messages' && newMessagesCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold px-1 shadow-sm">
                      {newMessagesCount}
                    </span>
                  )}
                  {!active && <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-slate-800/60">
        {/* Support */}
        <div className="px-4 py-3">
          <div className="rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-blue-500/20 p-3">
            <p className="text-xs font-semibold text-slate-300 mb-0.5">Besoin d&apos;aide ?</p>
            <Link
              href="https://portfolio-socrate.vercel.app/fr#contact"
              target="_blank"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Contacter le support →
            </Link>
          </div>
        </div>

        {/* User */}
        <div className="px-4 pb-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <p className="text-xs text-slate-400">Administrateur</p>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            title="Déconnexion"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

// ── Top Bar ───────────────────────────────────────────────────────────────────
function getPageTitle(pathname: string | null): string {
  if (!pathname) return 'Administration';
  if (pathname === '/admin') return 'Tableau de bord';
  if (pathname.startsWith('/admin/users')) return 'Utilisateurs';
  if (pathname.startsWith('/admin/articles')) return 'Articles';
  if (pathname.startsWith('/admin/ecoles')) return 'Écoles';
  if (pathname.startsWith('/admin/filieres')) return 'Filières';
  if (pathname.startsWith('/admin/contacts')) return 'Messages';
  if (pathname.startsWith('/admin/parametres')) return 'Paramètres';
  return 'Administration';
}

function TopBar({
  setSidebarOpen, userName, userInitials, newMessagesCount, handleSignOut, pathname
}: {
  setSidebarOpen: (open: boolean) => void;
  userName: string;
  userInitials: string;
  newMessagesCount: number;
  handleSignOut: () => void;
  pathname: string | null;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl px-4 shadow-sm sm:px-6 lg:px-8">
      <button
        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-none">{getPageTitle(pathname)}</h2>
          <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Link href="/admin/contacts">
            <div className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer">
              <Bell className="h-5 w-5" />
              {newMessagesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
                  {newMessagesCount > 9 ? '9+' : newMessagesCount}
                </span>
              )}
            </div>
          </Link>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          {/* User avatar */}
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-none">{userName}</p>
              <p className="text-xs text-slate-400 mt-0.5">Administrateur</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer">
              {userInitials}
            </div>
          </div>

          <button
            className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            onClick={handleSignOut}
            aria-label="Déconnexion"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-72">
        <div className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-8 rounded-xl" />
          <div className="flex flex-1 justify-between items-center">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <div className="grid grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}