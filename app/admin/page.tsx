"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  MessageSquare,
  Eye,
  Plus,
  TrendingUp,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { AdminStats } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tableau de bord</h1>
          <p className="text-slate-500 mt-1">
            Vue d'ensemble et statistiques de votre plateforme.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200">
            <TrendingUp className="mr-2 h-4 w-4" />
            Rapport
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Télécharger PDF
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-500/20 group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Utilisateurs</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-slate-500 mt-1">
              +20.1% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-emerald-500/20 group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Articles</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats?.totalArticles || 0}</div>
            <p className="text-xs text-slate-500 mt-1">
              {stats?.publishedArticles || 0} publiés, {stats?.draftArticles || 0} brouillons
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-amber-500/20 group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Messages</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats?.totalContacts || 0}</div>
            <p className="text-xs text-slate-500 mt-1">
              {stats?.newContacts || 0} nouveaux messages en attente
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-purple-500/20 group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Visites</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Eye className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12,345</div>
            <p className="text-xs text-slate-500 mt-1">
              +4% depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Actions rapides */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Actions Rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  Créer un article
                </CardTitle>
                <CardDescription className="pt-2">
                  Rédigez et publiez un nouvel article pour le blog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/articles/new">
                  <Button className="w-full bg-slate-900 text-white hover:bg-blue-600 transition-colors">
                    Commencer
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                    <MessageSquare className="h-5 w-5 text-amber-600" />
                  </div>
                  Consulter messages
                </CardTitle>
                <CardDescription className="pt-2">
                  Voir les {stats?.newContacts || 0} messages non lus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/contacts">
                  <Button variant="outline" className="w-full hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activité récente */}
        <div className="lg:col-span-3">
          <Card className="h-full border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Activité du système</CardTitle>
              <CardDescription>
                Journal des dernières actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                    <Clock className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900 text-sm">Système prêt</div>
                      <time className="font-caveat font-medium text-indigo-500 text-xs">Maintenant</time>
                    </div>
                    <div className="text-slate-500 text-xs">Le back-office est initialisé et prêt à l'emploi.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 