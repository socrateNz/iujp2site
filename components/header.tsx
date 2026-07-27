"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Nos Écoles", href: "/nos-ecoles" },
    { name: "Formations", href: "/formations" },
    { name: "Actualités", href: "/actualites" },
    { name: "Contacts", href: "/contacts" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Barre d'annonce UIJP ── */}
      <div className="w-full py-2 px-4 text-center text-sm font-bold tracking-widest uppercase text-white"
        style={{ background: "linear-gradient(90deg, #205C03 0%, #0B30BB 100%)" }}>
        <span>📅&nbsp; Inscriptions ouvertes pour la rentrée 2025–2026 &nbsp;—&nbsp; Rejoignez l'UIJP2 de Bafang !</span>
      </div>

      {/* ── Header principal ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"
          }`}
        style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img
                src="/Images/logo.png"
                alt="UIJP2 Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
              />
              <div className="hidden lg:flex flex-col leading-tight">
                <span
                  className="font-black uppercase tracking-wider text-sm"
                  style={{
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    color: "#2D2F2B",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    maxWidth: "250px",
                    lineHeight: 1.2,
                  }}
                >
                  Université Internationale
                </span>
                <span
                  className="font-black uppercase"
                  style={{
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    color: "#205C03",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Jean Paul II · Bafang
                </span>
              </div>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-xs font-oswald font-bold uppercase tracking-widest transition-colors duration-200 ${isActive(link.href)
                    ? "text-[#205C03]"
                    : "text-[#2D2F2B] hover:text-[#205C03]"
                    }`}
                  style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif", letterSpacing: "0.12em" }}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5"
                      style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTAs desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/catalogue.pdf"
                target="_blank"
                className="btn-uijp-outline-dark flex items-center gap-2"
              >
                <Download size={14} />
                Brochure
              </Link>
              <Link href="/candidature" className="btn-uijp">
                Candidature
              </Link>
            </div>

            {/* Burger mobile */}
            <button
              className="md:hidden p-2 rounded-md text-[#2D2F2B] hover:text-[#205C03] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Menu mobile ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 text-sm font-bold uppercase tracking-widest border-b border-gray-100 transition-colors ${isActive(link.href)
                      ? "text-[#205C03]"
                      : "text-[#2D2F2B] hover:text-[#205C03]"
                      }`}
                    style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  <Link href="/catalogue.pdf" target="_blank" className="btn-uijp-outline-dark text-center justify-center">
                    <Download size={14} /> Brochure
                  </Link>
                  <Link href="/candidature" className="btn-uijp text-center justify-center">
                    Candidature
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;