"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const link = [
    {
      name: "Accueil",
      href: "/"
    },
    {
      name: "Nos Ecoles",
      href: "/nos-ecoles"
    },
    {
      name: "Formations",
      href: "/formations"
    },
    {
      name: "Actualités",
      href: "/actualites"
    },
    {
      name: "Contacts",
      href: "/contacts"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };


  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          {/* <div className="mr-2 text-[#1B2A4A] text-3xl font-serif font-bold">
          <span className="text-[#D4AF37]">IUJP</span>II
        </div> */}
          <img src="/Images/logo.png" alt="Logo" className="size-10" />
          <div className="hidden md:block text-sm text-gray-600 font-serif">Institut Universitaire Jean-Paul II</div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {link.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`text-[#1B2A4A] hover:bg-[#93b197] ${isActive(item.href) ? "bg-[#34773D] text-white" : ""} hover:text-white !rounded-button whitespace-nowrap cursor-pointer `}
              onClick={() => router.push(item.href)}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;