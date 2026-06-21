"use client";

import { useEffect, useState } from 'react';
import {
  Users,
  FileText,
  MessageSquare,
  Eye,
  Plus,
  TrendingUp,
  ArrowUpRight,
  Activity,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Download,
  FileSpreadsheet,
} from 'lucide-react';
import Link from 'next/link';
import { AdminStats } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchStats();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erreur récupération statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (n: number) => n.toLocaleString('fr-FR');

  // ── Export PDF (téléchargement direct) ───────────────────────────
  const downloadPDF = async () => {
    if (!stats) return;
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF('p', 'mm', 'a4');
      const dateStr = new Date().toLocaleDateString('fr-FR');
      const timeStr = new Date().toLocaleTimeString('fr-FR');
      const filenameDate = dateStr.replace(/\//g, '-');

      // ── En-tête (Header) ──
      // Rectangle bleu foncé
      doc.setFillColor(30, 58, 95); // #1e3a5f
      doc.rect(15, 15, 180, 35, 'F');

      // Textes en-tête
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('Statistique — UIJP II', 25, 28);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Université Internationale Jean Paul II de Bafang', 25, 35);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.text(`Rapport généré le ${dateStr} à ${timeStr}`, 25, 42);

      // Helper pour dessiner une carte
      const drawCard = (x: number, y: number, w: number, h: number, accentColor: [number, number, number]) => {
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(226, 232, 240);
        doc.rect(x, y, w, h, 'FD');

        doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.rect(x, y, 3, h, 'F');
      };

      // // ── 👥 Utilisateurs ──
      // drawCard(15, 60, 85, 30, [59, 130, 246]); // Bleu
      // doc.setTextColor(100, 116, 139);
      // doc.setFont('helvetica', 'bold');
      // doc.setFontSize(8);
      // doc.text('UTILISATEURS', 22, 68);
      // doc.setTextColor(15, 23, 42);
      // doc.setFontSize(22);
      // doc.text(formatNumber(stats.totalUsers), 22, 78);
      // doc.setTextColor(148, 163, 184);
      // doc.setFont('helvetica', 'normal');
      // doc.setFontSize(9);
      // doc.text('Total utilisateurs inscrits', 22, 85);

      // ── 💬 Messages de contact ──
      drawCard(15, 100, 85, 45, [245, 158, 11]); // Orange
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('MESSAGES DE CONTACT', 22, 108);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(22);
      doc.text(formatNumber(stats.totalContacts), 22, 118);

      // ── 📰 Articles ──
      drawCard(110, 60, 85, 30, [16, 185, 129]); // Vert
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('ARTICLES', 117, 68);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(22);
      doc.text(formatNumber(stats.totalArticles), 117, 78);
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${stats.publishedArticles} publiés  ·  ${stats.draftArticles} brouillons`, 117, 85);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`Nouveaux (non lus) : ${stats.newContacts}`, 22, 128);
      doc.text(`Traités / Lus : ${stats.totalContacts - stats.newContacts}`, 22, 136);

      // ── 👁️ Visites du site ──
      drawCard(110, 100, 85, 45, [139, 92, 246]); // Violet
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('VISITES DU SITE', 117, 108);
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(22);
      doc.text(formatNumber(stats.totalVisits), 117, 118);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`Aujourd'hui : ${formatNumber(stats.todayVisits)} visites`, 117, 126);
      doc.text(`Cette semaine : ${formatNumber(stats.weekVisits)} visites`, 117, 132);
      doc.text(`Ce mois-ci : ${formatNumber(stats.monthVisits)} visites`, 117, 138);

      // ── 📊 Graphique des visites (Bar Chart) ──
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 58, 95);
      doc.text('GRAPHIQUE DES VISITES', 15, 160);

      // Lignes de repère (Y grid lines)
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.2);
      for (let i = 0; i <= 4; i++) {
        const yGrid = 215 - (i * 10);
        doc.line(15, yGrid, 195, yGrid);
      }

      // Axe X (ligne de base principale)
      doc.setDrawColor(148, 163, 184); // slate-400
      doc.setLineWidth(0.6);
      doc.line(15, 215, 195, 215);

      // Calcul des hauteurs des barres
      const maxVal = Math.max(stats.todayVisits, stats.weekVisits, stats.monthVisits, 1);
      const hToday = (stats.todayVisits / maxVal) * 40;
      const hWeek = (stats.weekVisits / maxVal) * 40;
      const hMonth = (stats.monthVisits / maxVal) * 40;

      // Dessin des barres
      // 1. Aujourd'hui
      doc.setFillColor(59, 130, 246); // Bleu
      doc.rect(35, 215 - hToday, 25, hToday, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(formatNumber(stats.todayVisits), 35 + 12.5, 210 - hToday, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105); // slate-600
      doc.text("Aujourd'hui", 35 + 12.5, 222, { align: 'center' });

      // 2. Cette semaine
      doc.setFillColor(16, 185, 129); // Vert
      doc.rect(90, 215 - hWeek, 25, hWeek, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(formatNumber(stats.weekVisits), 90 + 12.5, 210 - hWeek, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Cette semaine", 90 + 12.5, 222, { align: 'center' });

      // 3. Ce mois
      doc.setFillColor(139, 92, 246); // Violet
      doc.rect(145, 215 - hMonth, 25, hMonth, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(formatNumber(stats.monthVisits), 145 + 12.5, 210 - hMonth, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("Ce mois-ci", 145 + 12.5, 222, { align: 'center' });

      // ── Ligne de séparation ──
      doc.setDrawColor(241, 245, 249);
      doc.line(15, 245, 195, 245);

      // ── Pied de page (Footer) ──
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Université Internationale Jean Paul II de Bafang', 15, 275);
      doc.text('Document confidentiel — Usage interne uniquement', 15, 280);
      doc.text('Généré automatiquement par le système d\'administration UIJP II', 15, 285);

      doc.text('Page 1 / 1', 180, 285);

      // Télécharger directement le PDF
      doc.save(`rapport-statistiques-uijp2-${filenameDate}.pdf`);
    } catch (err) {
      console.error('Erreur génération PDF:', err);
    }
  };

  const greeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  if (loading) {
    return (
      <div className="space-y-8 pb-8 animate-pulse">

        {/* Hero skeleton */}
        <div className="rounded-2xl bg-slate-200 h-52 w-full" />

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-slate-200" />
                <div className="h-4 w-4 rounded bg-slate-100" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-8 w-20 rounded-lg bg-slate-300" />
                <div className="h-2.5 w-40 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions + system status skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick actions (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-200" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="h-3 w-3/4 rounded bg-slate-100" />
                  <div className="h-9 w-full rounded-xl bg-slate-200 mt-2" />
                </div>
              ))}
            </div>
          </div>

          {/* System status (1 col) */}
          <div className="space-y-4">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-slate-200" />
                    <div className="h-3 w-28 rounded bg-slate-200" />
                  </div>
                  <div className="h-5 w-24 rounded-full bg-slate-200" />
                </div>
              ))}
              <div className="h-14 w-full rounded-xl bg-slate-100 mt-2" />
              <div className="h-20 w-full rounded-xl bg-purple-50 mt-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Utilisateurs',
      value: formatNumber(stats?.totalUsers || 0),
      sub: 'Total inscrits',
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      ring: 'ring-blue-200',
    },
    {
      label: 'Articles',
      value: formatNumber(stats?.totalArticles || 0),
      sub: `${stats?.publishedArticles || 0} publiés · ${stats?.draftArticles || 0} brouillons`,
      icon: FileText,
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-700',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      ring: 'ring-emerald-200',
    },
    {
      label: 'Messages',
      value: formatNumber(stats?.totalContacts || 0),
      sub: `${stats?.newContacts || 0} nouveaux non lus`,
      icon: MessageSquare,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      ring: 'ring-amber-200',
      badge: stats?.newContacts,
    },
    {
      label: 'Visites du site',
      value: formatNumber(stats?.totalVisits || 0),
      sub: `${formatNumber(stats?.todayVisits || 0)} aujourd'hui · ${formatNumber(stats?.weekVisits || 0)} cette semaine`,
      icon: Eye,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-700',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      ring: 'ring-purple-200',
    },
  ];

  return (
    <div className="space-y-8 pb-8">

      {/* ── Hero Header ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 shadow-xl">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-1">
              {greeting()}, Administrateur 👋
            </p>
            <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
            <p className="mt-2 text-slate-400 text-sm">
              Vue d&apos;ensemble de la plateforme UIJP II
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/articles/new">
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-900/40">
                <Plus className="h-4 w-4" />
                Nouvel article
              </button>
            </Link>
            <Link href="/admin/contacts">
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white border border-white/10 transition-all duration-200 hover:-translate-y-0.5">
                <MessageSquare className="h-4 w-4" />
                Messages
                {(stats?.newContacts ?? 0) > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
                    {stats?.newContacts}
                  </span>
                )}
              </button>
            </Link>
            <button
              onClick={downloadPDF}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white border border-white/10 transition-all duration-200 hover:-translate-y-0.5"
              title="Générer un rapport PDF"
            >
              <Download className="h-4 w-4" />
              Rapport PDF
            </button>
          </div>
        </div>

        {/* Quick visit strip */}
        <div className="relative mt-6 flex flex-wrap gap-4">
          {[
            { label: "Aujourd'hui", value: formatNumber(stats?.todayVisits || 0), icon: Calendar },
            { label: 'Cette semaine', value: formatNumber(stats?.weekVisits || 0), icon: BarChart3 },
            { label: 'Ce mois', value: formatNumber(stats?.monthVisits || 0), icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <Icon className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-[11px] text-slate-400">{label}</p>
                <p className="text-sm font-bold text-white">{value} visites</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`group relative rounded-2xl border ${card.border} bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Gradient accent top bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.gradient}`} />

              <div className="flex items-start justify-between">
                <div className={`rounded-xl ${card.bg} p-3 ring-1 ${card.ring} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-5 w-5 ${card.text}`} />
                </div>
                {card.badge && card.badge > 0 ? (
                  <span className="flex h-6 items-center gap-1 rounded-full bg-red-50 px-2 text-xs font-semibold text-red-600 border border-red-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    {card.badge} nouveau{card.badge > 1 ? 'x' : ''}
                  </span>
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-1 text-3xl font-extrabold text-slate-900 tabular-nums">{card.value}</p>
                <p className="mt-1.5 text-xs text-slate-400">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Quick Actions + Activity ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Actions rapides</h2>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              {
                href: '/admin/articles/new',
                icon: Plus,
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                title: 'Créer un article',
                desc: 'Rédigez et publiez un nouvel article sur la plateforme.',
                cta: 'Commencer',
                ctaStyle: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-200',
              },
              {
                href: '/admin/contacts',
                icon: MessageSquare,
                iconBg: 'bg-amber-100',
                iconColor: 'text-amber-600',
                title: 'Consulter les messages',
                desc: `${stats?.newContacts || 0} message${(stats?.newContacts || 0) > 1 ? 's' : ''} en attente de réponse.`,
                cta: 'Accéder',
                ctaStyle: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200',
              },
              {
                href: '/admin/articles',
                icon: FileText,
                iconBg: 'bg-emerald-100',
                iconColor: 'text-emerald-600',
                title: 'Gérer les articles',
                desc: `${stats?.totalArticles || 0} articles dont ${stats?.publishedArticles || 0} publiés.`,
                cta: 'Voir tout',
                ctaStyle: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200',
              },
              {
                href: '/admin/users',
                icon: Users,
                iconBg: 'bg-violet-100',
                iconColor: 'text-violet-600',
                title: 'Gérer les utilisateurs',
                desc: `${stats?.totalUsers || 0} compte${(stats?.totalUsers || 0) > 1 ? 's' : ''} enregistré${(stats?.totalUsers || 0) > 1 ? 's' : ''}.`,
                cta: 'Voir tout',
                ctaStyle: 'bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200',
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.href} className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
                  <div className={`inline-flex rounded-xl ${action.iconBg} p-2.5 mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900">{action.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{action.desc}</p>
                  <Link href={action.href}>
                    <button className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 ${action.ctaStyle}`}>
                      {action.cta}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">État du système</h2>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm h-full">

            {/* Status items */}
            <div className="space-y-4">
              {[
                { label: 'API Backend', status: 'Opérationnel', ok: true },
                { label: 'Base de données', status: 'Connectée', ok: true },
                { label: 'Stockage médias', status: 'Cloudinary actif', ok: true },
                { label: 'Authentification', status: 'NextAuth actif', ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Last refresh */}
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Clock className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Dernière mise à jour</p>
                <p className="text-sm font-semibold text-slate-700">
                  {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Visits highlight */}
            <div className="mt-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-purple-600" />
                <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Visites totales</p>
              </div>
              <p className="text-3xl font-extrabold text-purple-900 tabular-nums">
                {formatNumber(stats?.totalVisits || 0)}
              </p>
              <p className="text-xs text-purple-500 mt-1">
                {formatNumber(stats?.monthVisits || 0)} ce mois-ci
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}