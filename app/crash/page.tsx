"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Mail, RefreshCw, Globe } from 'lucide-react';

export default function CrashPage() {
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden selection:bg-red-500/30 selection:text-red-200">

      {/* Cercles de lumière rouges et sombres en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-950/20 blur-[150px]" />
        <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] rounded-full bg-rose-950/20 blur-[120px]" />

        {/* Grille technologique subtile */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(239, 68, 68, 0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Conteneur principal avec animation d'entrée */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-xl w-full z-10"
      >

        {/* Carte en verre dépoli aux nuances rouges */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-red-950/50 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(239,68,68,0.08)]">

          {/* Section d'en-tête et Icône */}
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              className="relative mb-5"
            >
              {/* Effet pulsant d'arrière-plan */}
              <div className="absolute inset-0 rounded-2xl bg-red-600/20 blur-md animate-pulse" />

              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center shadow-lg shadow-red-950/40 border border-red-500/30">
                <Globe className="h-8 w-8 text-white animate-pulse" />
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-slate-950 rounded-full flex items-center justify-center border border-red-900">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                </div>
              </div>
            </motion.div>

            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-red-950/60 border border-red-900/50 text-red-400 uppercase tracking-widest mb-3">
              Statut : Suspendu
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Nom de domaine expiré
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed text-center">
            <p>
              L&apos;accès à ce site web a été temporairement suspendu car le nom de domaine associé a expiré ou le service n&apos;a pas été renouvelé.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">
              Si vous êtes l&apos;administrateur de cet établissement, veuillez contacter votre bureau d&apos;enregistrement de domaine ou votre équipe technique pour régulariser la situation et rétablir l&apos;accès dans les plus brefs délais pour eviter la perte de celui-ci.
            </p>
          </div>

          {/* Détails du diagnostic technique */}
          <div className="mt-8 bg-slate-950/60 border border-red-950/20 rounded-xl p-4 font-mono text-[11px] text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Statut de la passerelle :</span>
              <span className="text-red-400 font-semibold">DOMAIN_EXPIRED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Code d&apos;erreur :</span>
              <span className="text-slate-300">ERR_DOMAIN_EXPIRED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Généré le :</span>
              <span className="text-slate-300">{new Date().toLocaleDateString('fr-FR')} - {new Date().toLocaleTimeString('fr-FR')}</span>
            </div>
            <div className="flex justify-between border-t border-red-950/30 pt-1.5 mt-1.5">
              <span className="text-slate-500">Hôte :</span>
              <span className="text-slate-300 truncate max-w-[280px]">Université Internationale Jean Paul II</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReload}
              disabled={isReloading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-sm py-3 px-4 shadow-lg shadow-red-950/50 hover:shadow-red-950/70 border border-red-500/20 active:translate-y-[1px] disabled:opacity-75 transition-all duration-150 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isReloading ? 'animate-spin' : ''}`} />
              {isReloading ? 'Actualisation...' : 'Actualiser la page'}
            </button>
          </div>

        </div>

        {/* Pied de page */}
        <div className="mt-8 text-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} UIJP II. Tous droits réservés.</p>
        </div>

      </motion.div>
    </div>
  );
}
