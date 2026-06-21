"use client";

import Link from 'next/link';

import { Home, Newspaper, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center px-4">

      {/* Cercles décoratifs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-100/40 blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg w-full">

        {/* Grand 404 */}
        <div className="relative mb-6 select-none">
          <p className="text-[10rem] sm:text-[12rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-blue-200 to-slate-300">
            404
          </p>
          {/* Icône superposée */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-white shadow-xl border border-slate-100 p-5">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200 mx-auto mb-3">
                <span className="text-white font-black text-xl">UI</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase">UIJP II</p>
            </div>
          </div>
        </div>

        {/* Texte */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Page introuvable
        </h1>
        <p className="text-slate-500 leading-relaxed mb-8 text-sm sm:text-base">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          <br />
          Vérifiez l&apos;URL ou retournez à l&apos;accueil.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5">
              <Home className="h-4 w-4" />
              Retour à l&apos;accueil
            </Button>
          </Link>
          <Link href="/actualites">
            <Button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5">
              <Newspaper className="h-4 w-4" />
              Voir les actualités
            </Button>
          </Link>
        </div>

        {/* Lien retour */}
        <Button
          onClick={() => typeof window !== 'undefined' && window.history.back()}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Revenir à la page précédente
        </Button>
      </div>
    </div>
  );
}
