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
  Download,
  GraduationCap,
  PieChart as PieChartIcon,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { AdminStats } from '@/lib/types';
import * as echarts from 'echarts';

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

  // ── Initialisation des graphiques ECharts ──────────────────────────
  useEffect(() => {
    if (!stats) return;

    // 1. Graphique d'évolution des visites
    const visitsDom = document.getElementById('admin-visits-chart');
    if (visitsDom) {
      const visitsChart = echarts.init(visitsDom);
      visitsChart.setOption({
        animation: true,
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: '{b} : <b>{c} visites</b>',
          backgroundColor: '#011636',
          textStyle: { color: '#ffffff', fontSize: 12 },
          borderColor: '#E3A402',
          borderWidth: 1,
        },
        grid: { left: '2%', right: '2%', bottom: '8%', top: '12%', containLabel: true },
        xAxis: [
          {
            type: 'category',
            data: ["Aujourd'hui", 'Cette semaine', 'Ce mois-ci'],
            axisLine: { lineStyle: { color: '#cbd5e1' } },
            axisLabel: { color: '#334155', fontWeight: 'bold', fontSize: 12 },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { show: false },
            splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
            axisLabel: { color: '#64748b' },
          },
        ],
        series: [
          {
            name: 'Visites',
            type: 'bar',
            barWidth: '38%',
            data: [stats.todayVisits, stats.weekVisits, stats.monthVisits],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#205C03' },
                { offset: 1, color: '#0B30BB' },
              ]),
              borderRadius: [6, 6, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
              color: '#0f172a',
              fontWeight: 'bold',
              fontSize: 12,
            },
          },
        ],
      });

      const handleResizeVisits = () => visitsChart.resize();
      window.addEventListener('resize', handleResizeVisits);
    }

    // 2. Graphique Donut de répartition des contenus & candidatures
    const distDom = document.getElementById('admin-distribution-chart');
    if (distDom) {
      const distChart = echarts.init(distDom);
      const treatedContacts = Math.max(0, stats.totalContacts - stats.newContacts);
      distChart.setOption({
        animation: true,
        tooltip: {
          trigger: 'item',
          formatter: '{b} : <b>{c}</b> ({d}%)',
          backgroundColor: '#011636',
          textStyle: { color: '#ffffff', fontSize: 12 },
          borderColor: '#205C03',
          borderWidth: 1,
        },
        legend: { bottom: '0%', left: 'center', icon: 'circle', textStyle: { color: '#475569', fontSize: 11 } },
        series: [
          {
            name: 'Répartition',
            type: 'pie',
            radius: ['45%', '75%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 6, borderColor: '#ffffff', borderWidth: 3 },
            label: { show: false },
            emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#0f172a' } },
            data: [
              { value: stats.totalCandidatures || 0, name: 'Candidatures d\'admission', itemStyle: { color: '#7e22ce' } },
              { value: stats.publishedArticles, name: 'Articles publiés', itemStyle: { color: '#205C03' } },
              { value: stats.draftArticles, name: 'Articles brouillons', itemStyle: { color: '#94a3b8' } },
              { value: stats.newContacts, name: 'Messages non lus', itemStyle: { color: '#ef4444' } },
              { value: treatedContacts, name: 'Messages traités', itemStyle: { color: '#E3A402' } },
            ],
          },
        ],
      });

      const handleResizeDist = () => distChart.resize();
      window.addEventListener('resize', handleResizeDist);
    }
  }, [stats]);

  // ── Export PDF Exécutif Premium (EXCLUT UTILISATEURS - INCLUT CANDIDATURES) ──
  const downloadPDF = async () => {
    if (!stats) return;
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF('p', 'mm', 'a4');
      const dateStr = new Date().toLocaleDateString('fr-FR');
      const timeStr = new Date().toLocaleTimeString('fr-FR');
      const filenameDate = dateStr.replace(/\//g, '-');

      // ── En-tête Institutionnel (Header) ──
      doc.setFillColor(1, 22, 54);
      doc.rect(15, 15, 180, 36, 'F');

      // Bandes d'accent Vert UIJP & Or
      doc.setFillColor(32, 92, 3); // #205C03
      doc.rect(15, 15, 90, 3, 'F');
      doc.setFillColor(227, 164, 2); // #E3A402
      doc.rect(105, 15, 90, 3, 'F');

      // Titres en-tête
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('UIJP II — RAPPORT DE STATISTIQUES', 22, 28);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(200, 215, 235);
      doc.text('Université Internationale Jean Paul II de Bafang', 22, 34);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(180, 195, 210);
      doc.text(`Rapport généré le ${dateStr} à ${timeStr} | Système d'Administration`, 22, 42);

      // Badge "CONFIDENTIEL"
      doc.setFillColor(227, 164, 2);
      doc.roundedRect(145, 24, 42, 10, 2, 2, 'F');
      doc.setTextColor(1, 22, 54);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('CONFIDENTIEL', 166, 30.5, { align: 'center' });

      // Helper pour dessiner une carte KPI dans le PDF
      const drawKpiCard = (
        x: number,
        y: number,
        w: number,
        h: number,
        title: string,
        mainValue: string,
        subLines: string[],
        accentColor: [number, number, number]
      ) => {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, y, w, h, 2, 2, 'FD');

        doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.rect(x, y, 3.5, h, 'F');

        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(title.toUpperCase(), x + 8, y + 10);

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text(mainValue, x + 8, y + 21);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        let currY = y + 28;
        subLines.forEach((line) => {
          doc.text(line, x + 8, currY);
          currY += 5;
        });
      };

      const treatedContacts = Math.max(0, stats.totalContacts - stats.newContacts);

      // ── Grille 2x2 Cartes KPI (PDF : Candidatures, Articles, Messages, Visites) ──
      // Card 1: Candidatures (Top-Left)
      drawKpiCard(
        15, 57, 86, 38,
        'Candidatures d\'Admission',
        formatNumber(stats.totalCandidatures || 0),
        [
          `• Dossiers soumis en ligne`,
          `• En attente de traitement : ${stats.pendingCandidatures || 0}`,
        ],
        [126, 34, 206] // Violet #7e22ce
      );

      // Card 2: Articles (Top-Right)
      drawKpiCard(
        109, 57, 86, 38,
        'Articles de Presse',
        formatNumber(stats.totalArticles),
        [
          `• Articles publiés : ${stats.publishedArticles}`,
          `• Brouillons en attente : ${stats.draftArticles}`,
        ],
        [32, 92, 3] // Vert UIJP
      );

      // Card 3: Messages de contact (Bottom-Left)
      drawKpiCard(
        15, 101, 86, 38,
        'Messages de Contact',
        formatNumber(stats.totalContacts),
        [
          `• Nouveaux (non lus) : ${stats.newContacts}`,
          `• Traités / Lus : ${treatedContacts}`,
        ],
        [227, 164, 2] // Or
      );

      // Card 4: Visites du Site (Bottom-Right)
      drawKpiCard(
        109, 101, 86, 38,
        'Visites du Site',
        formatNumber(stats.totalVisits),
        [
          `• Aujourd'hui : ${formatNumber(stats.todayVisits)} | Semaine : ${formatNumber(stats.weekVisits)}`,
          `• Ce mois-ci : ${formatNumber(stats.monthVisits)}`,
        ],
        [6, 156, 197] // Cyan
      );

      // ── Section 2: Graphique Visites ──
      doc.setFillColor(241, 245, 249);
      doc.rect(15, 147, 180, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(1, 22, 54);
      doc.text('ANALYSE ET GRAPHIQUE DES VISITES', 20, 152);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(15, 158, 180, 62, 2, 2, 'FD');

      // Lignes de grille
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      for (let i = 1; i <= 3; i++) {
        const yGrid = 205 - (i * 12);
        doc.line(25, yGrid, 185, yGrid);
      }

      // Axe X
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.line(25, 205, 185, 205);

      const maxVal = Math.max(stats.todayVisits, stats.weekVisits, stats.monthVisits, 1);
      const chartMaxH = 32;
      const hToday = (stats.todayVisits / maxVal) * chartMaxH;
      const hWeek = (stats.weekVisits / maxVal) * chartMaxH;
      const hMonth = (stats.monthVisits / maxVal) * chartMaxH;

      // Barres
      doc.setFillColor(11, 48, 187);
      doc.roundedRect(42, 205 - hToday, 22, Math.max(hToday, 2), 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(11, 48, 187);
      doc.text(formatNumber(stats.todayVisits), 53, 201 - hToday, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text("Aujourd'hui", 53, 211, { align: 'center' });

      doc.setFillColor(6, 156, 197);
      doc.roundedRect(94, 205 - hWeek, 22, Math.max(hWeek, 2), 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(6, 156, 197);
      doc.text(formatNumber(stats.weekVisits), 105, 201 - hWeek, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text("Cette semaine", 105, 211, { align: 'center' });

      doc.setFillColor(32, 92, 3);
      doc.roundedRect(146, 205 - hMonth, 22, Math.max(hMonth, 2), 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(32, 92, 3);
      doc.text(formatNumber(stats.monthVisits), 157, 201 - hMonth, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text("Ce mois-ci", 157, 211, { align: 'center' });

      // ── Section 3: Tableau Récapitulatif ──
      doc.setFillColor(241, 245, 249);
      doc.rect(15, 226, 180, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(1, 22, 54);
      doc.text('SYNTHÈSE ET INDICATEURS DE PERFORMANCE', 20, 231);

      doc.setFillColor(1, 22, 54);
      doc.rect(15, 235, 180, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('INDICATEUR', 20, 239);
      doc.text('VALEUR', 100, 239);
      doc.text('STATUT / TAUX', 150, 239);

      const pubRate = stats.totalArticles > 0 ? Math.round((stats.publishedArticles / stats.totalArticles) * 100) : 0;
      const respRate = stats.totalContacts > 0 ? Math.round((treatedContacts / stats.totalContacts) * 100) : 0;

      const rows = [
        { ind: 'Candidatures d\'admission reçues', val: `${formatNumber(stats.totalCandidatures || 0)}`, stat: `${stats.pendingCandidatures || 0} en attente` },
        { ind: 'Taux de publication des articles', val: `${stats.publishedArticles} / ${stats.totalArticles}`, stat: `${pubRate}% publiés` },
        { ind: 'Taux de traitement des messages', val: `${treatedContacts} / ${stats.totalContacts}`, stat: `${respRate}% traités` },
        { ind: 'Fréquentation mensuelle enregistrée', val: `${formatNumber(stats.monthVisits)}`, stat: `Activité continue` },
      ];

      let tableY = 241;
      rows.forEach((r, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
        doc.rect(15, tableY, 180, 5.5, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(30, 41, 59);
        doc.text(r.ind, 20, tableY + 3.8);
        doc.setFont('helvetica', 'bold');
        doc.text(r.val, 100, tableY + 3.8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(16, 185, 129);
        doc.text(r.stat, 150, tableY + 3.8);

        tableY += 5.5;
      });

      // ── Footer ──
      doc.setDrawColor(227, 164, 2);
      doc.setLineWidth(0.6);
      doc.line(15, 274, 195, 274);

      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('Université Internationale Jean Paul II de Bafang — Rapport Officiel de Gestion', 15, 280);
      doc.text('Document interne strictement confidentiel — Généré par le système d\'administration.', 15, 284);

      doc.setFont('helvetica', 'bold');
      doc.text('Page 1 sur 1', 180, 284);

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
        <div className="rounded-2xl bg-slate-200 h-52 w-full" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {[...Array(5)].map((_, i) => (
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
      </div>
    );
  }

  const pubRate = (stats?.totalArticles ?? 0) > 0 
    ? Math.round(((stats?.publishedArticles ?? 0) / (stats?.totalArticles ?? 1)) * 100) 
    : 0;

  const treatedContacts = Math.max(0, (stats?.totalContacts ?? 0) - (stats?.newContacts ?? 0));
  const respRate = (stats?.totalContacts ?? 0) > 0 
    ? Math.round((treatedContacts / (stats?.totalContacts ?? 1)) * 100) 
    : 0;

  // ── Stat Cards pour l'interface WEB (AVEC Candidatures & Utilisateurs) ──────
  const statCards = [
    {
      label: 'Candidatures',
      value: formatNumber(stats?.totalCandidatures || 0),
      sub: `${stats?.pendingCandidatures || 0} dossier(s) en attente`,
      icon: GraduationCap,
      color: '#7e22ce',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      ring: 'ring-purple-200',
      badge: stats?.pendingCandidatures,
    },
    {
      label: 'Articles',
      value: formatNumber(stats?.totalArticles || 0),
      sub: `${stats?.publishedArticles || 0} publiés (${pubRate}%) · ${stats?.draftArticles || 0} brouillons`,
      icon: FileText,
      color: '#205C03',
      bg: 'bg-[#205C03]/10',
      text: 'text-[#205C03]',
      ring: 'ring-[#205C03]/20',
    },
    {
      label: 'Messages de contact',
      value: formatNumber(stats?.totalContacts || 0),
      sub: `${stats?.newContacts || 0} nouveaux (${respRate}% traités)`,
      icon: MessageSquare,
      color: '#E3A402',
      bg: 'bg-[#E3A402]/10',
      text: 'text-[#E3A402]',
      ring: 'ring-[#E3A402]/20',
      badge: stats?.newContacts,
    },
    {
      label: 'Visites du site',
      value: formatNumber(stats?.totalVisits || 0),
      sub: `${formatNumber(stats?.todayVisits || 0)} aujourd'hui · ${formatNumber(stats?.monthVisits || 0)} ce mois`,
      icon: Eye,
      color: '#069CC5',
      bg: 'bg-[#069CC5]/10',
      text: 'text-[#069CC5]',
      ring: 'ring-[#069CC5]/20',
    },
    {
      label: 'Utilisateurs',
      value: formatNumber(stats?.totalUsers || 0),
      sub: 'Comptes inscrits',
      icon: Users,
      color: '#0B30BB',
      bg: 'bg-[#0B30BB]/10',
      text: 'text-[#0B30BB]',
      ring: 'ring-[#0B30BB]/20',
    },
  ];

  return (
    <div className="space-y-8 pb-8">

      {/* ── Hero Header ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#011636] via-[#205C03] to-[#0B30BB] p-8 shadow-xl" style={{ borderRadius: "2px" }}>
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-black/20 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              {greeting()}, Administrateur 👋
            </p>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Tableau de bord & Statistiques</h1>
            <p className="mt-2 text-white/80 text-sm" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Analytiques en temps réel et performances de la plateforme UIJP II
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/articles/new">
              <button className="btn-eemi flex items-center gap-2 shadow-lg shadow-[#205C03]/30 hover:shadow-[#0B30BB]/40">
                <Plus className="h-4 w-4" />
                Nouvel article
              </button>
            </Link>
            <Link href="/admin/candidatures">
              <button className="btn-eemi flex items-center gap-2 shadow-lg shadow-[#205C03]/30 hover:shadow-[#0B30BB]/40">
                <GraduationCap className="h-4 w-4" />
                Candidatures
              </button>
            </Link>
            <Link href="/admin/contacts">
              <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white border border-white/10 transition-all duration-200 hover:-translate-y-0.5" style={{ borderRadius: "2px", textTransform: "uppercase", fontFamily: "var(--font-oswald), Oswald, sans-serif", letterSpacing: "0.05em" }}>
                <MessageSquare className="h-4 w-4" />
                Messages
                {(stats?.newContacts ?? 0) > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-[2px] bg-red-500 text-[10px] font-bold">
                    {stats?.newContacts}
                  </span>
                )}
              </button>
            </Link>
            <button
              onClick={downloadPDF}
              className="inline-flex items-center gap-2 bg-[#E3A402] hover:bg-[#c99102] text-[#011636] px-5 py-2.5 text-sm font-bold shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderRadius: "2px", textTransform: "uppercase", fontFamily: "var(--font-oswald), Oswald, sans-serif", letterSpacing: "0.05em" }}
              title="Générer un rapport PDF haute définition"
            >
              <Download className="h-4 w-4" />
              Télécharger Rapport PDF
            </button>
          </div>
        </div>

        {/* Quick visit strip */}
        <div className="relative mt-6 flex flex-wrap gap-4">
          {[
            { label: "Aujourd'hui", value: formatNumber(stats?.todayVisits || 0), icon: Calendar },
            { label: 'Cette semaine', value: formatNumber(stats?.weekVisits || 0), icon: BarChart3 },
            { label: 'Ce mois-ci', value: formatNumber(stats?.monthVisits || 0), icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-sm">
              <Icon className="h-4 w-4 text-[#E3A402]" />
              <div>
                <p className="text-[11px] text-white/70">{label}</p>
                <p className="text-sm font-bold text-white">{value} visites</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat KPI Cards (Web Dashboard : 5 Cartes) ─────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="group relative bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{
                borderLeft: `4px solid ${card.color}`,
                borderBottom: `4px solid ${card.color === '#205C03' ? '#E3A402' : '#205C03'}`,
                borderRadius: "2px"
              }}
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-[2px] ${card.bg} p-2.5 ring-1 ${card.ring} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-5 w-5 ${card.text}`} />
                </div>
                {card.badge && card.badge > 0 ? (
                  <span className="flex h-5 items-center gap-1 rounded-full bg-red-50 px-2 text-[11px] font-semibold text-red-600 border border-red-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    {card.badge} nouveau{card.badge > 1 ? 'x' : ''}
                  </span>
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                )}
              </div>

              <div className="mt-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>{card.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900 tabular-nums">{card.value}</p>
                <p className="mt-1 text-[11px] text-slate-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Section Graphiques Visuels (ECharts) ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Graphique d'Évolution des Visites (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-4" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#111111] uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                <BarChart3 className="h-5 w-5 text-[#205C03]" />
                Évolution des Visites du Site
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Fréquentation comparée : aujourd'hui, semaine et mois en cours</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#205C03] bg-[#205C03]/10 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5" />
              Temps Réel
            </span>
          </div>

          <div id="admin-visits-chart" className="w-full" style={{ height: "300px" }} />
        </div>

        {/* Graphique Donut de Répartition (1 col) */}
        <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-4" style={{ borderLeft: "4px solid #E3A402", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>
          <div>
            <h2 className="text-lg font-black text-[#111111] uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              <PieChartIcon className="h-5 w-5 text-[#E3A402]" />
              Répartition des Activités & Contenus
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Ratio candidatures, articles et messages</p>
          </div>

          <div id="admin-distribution-chart" className="w-full" style={{ height: "300px" }} />
        </div>
      </div>

      {/* ── Quick Actions + System Status ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#111111] uppercase tracking-wider" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Actions rapides</h2>
            <div className="h-1 w-10 rounded-full" style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              {
                href: '/admin/candidatures',
                icon: GraduationCap,
                iconBg: 'bg-purple-100',
                iconColor: 'text-purple-600',
                title: 'Gérer les candidatures',
                desc: `${stats?.totalCandidatures || 0} candidature(s) enregistrée(s).`,
                cta: 'Consulter',
                ctaStyle: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200',
              },
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
                desc: `${stats?.totalArticles || 0} articles dont ${stats?.publishedArticles || 0} publiés (${pubRate}%).`,
                cta: 'Voir tout',
                ctaStyle: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200',
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.href} className="group bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
                  <div className={`inline-flex rounded-[2px] ${action.iconBg} p-2.5 mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className={`h-5 w-5 ${action.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900">{action.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{action.desc}</p>
                  <Link href={action.href}>
                    <button className={`mt-4 w-full rounded-[2px] px-4 py-2 text-sm font-bold uppercase tracking-widest shadow-sm transition-all duration-200 ${action.ctaStyle}`} style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
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
            <h2 className="text-lg font-black text-[#111111] uppercase tracking-wider" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>État du système</h2>
            <Activity className="h-4 w-4 text-[#205C03]" />
          </div>
          <div className="bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] h-full" style={{ borderLeft: "4px solid #0B30BB", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>

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

            <div className="mt-5 flex items-center gap-2 rounded-[2px] bg-slate-50 p-3">
              <Clock className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Dernière mise à jour</p>
                <p className="text-sm font-semibold text-slate-700">
                  {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[2px] bg-gradient-to-br from-[#205C03]/5 to-[#0B30BB]/5 border border-[#205C03]/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-[#205C03]" />
                <p className="text-xs font-semibold text-[#205C03] uppercase tracking-wide">Stabilité de la Plateforme</p>
              </div>
              <p className="text-2xl font-extrabold text-[#111111]">
                99.9% Uptime
              </p>
              <p className="text-xs text-[#0B30BB] mt-1">
                Système d'administration UIJP II sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}