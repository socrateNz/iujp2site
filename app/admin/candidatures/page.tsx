"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash,
  Phone,
  Mail,
  MapPin,
  BookOpen,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Candidature } from '@/lib/types';
import { toast } from 'sonner';

export default function AdminCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCandidature, setSelectedCandidature] = useState<Candidature | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const fetchCandidatures = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus) params.append('status', filterStatus);

      const response = await fetch(`/api/admin/candidatures?${params}`);
      const data = await response.json();

      if (data.success) {
        setCandidatures(data.data.candidatures || []);
      }
    } catch (error) {
      console.error('Erreur récupération candidatures:', error);
      toast.error('Erreur lors du chargement des candidatures');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/candidatures?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Statut de la candidature mis à jour');
        if (selectedCandidature && selectedCandidature._id?.toString() === id) {
          setSelectedCandidature({ ...selectedCandidature, status: newStatus as any });
        }
        fetchCandidatures();
      } else {
        toast.error(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) return;

    try {
      const res = await fetch(`/api/admin/candidatures?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Candidature supprimée');
        if (selectedCandidature && selectedCandidature._id?.toString() === id) {
          setSelectedCandidature(null);
        }
        fetchCandidatures();
      } else {
        toast.error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <Badge className="bg-[#E3A402] hover:bg-[#E3A402]/90 text-white rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
            Nouveau
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-[#0B30BB] hover:bg-[#0B30BB]/90 text-white rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
            En cours
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-[#205C03] hover:bg-[#205C03]/90 text-white rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
            Accepté
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-600 hover:bg-red-700 text-white rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
            Refusé
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="rounded-[2px] uppercase tracking-widest text-[10px]">
            {status}
          </Badge>
        );
    }
  };

  const filteredCandidatures = candidatures.filter((c) => {
    const matchesSearch =
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.filiere.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || c.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCandidatures.length / itemsPerPage);
  const paginatedCandidatures = filteredCandidatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading && candidatures.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#205C03]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
          Candidatures
        </h1>
        <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          Gestion et suivi des demandes d&apos;inscription des étudiants.
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher (Nom, Filière, Téléphone)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 rounded-[2px] border-slate-200 focus:ring-[#205C03] focus:border-[#205C03]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-200 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#205C03] bg-white text-sm text-slate-600"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <option value="">Tous les statuts</option>
            <option value="new">Nouveaux</option>
            <option value="in_progress">En cours de traitement</option>
            <option value="accepted">Acceptés</option>
            <option value="rejected">Refusés</option>
          </select>

          <Button
            onClick={fetchCandidatures}
            variant="outline"
            className="border-slate-200 hover:bg-slate-50 text-slate-600 rounded-[2px] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            Actualiser la liste
          </Button>
        </div>
      </div>

      {/* Liste des candidatures */}
      <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden" style={{ borderLeft: "4px solid #0B30BB", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>
        <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              Dossiers Reçus
            </h2>
            <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {filteredCandidatures.length} candidature(s) enregistrée(s)
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {paginatedCandidatures.map((c) => {
            const candId = c._id?.toString() || '';
            const formattedPhone = c.telephone.replace(/[^0-9]/g, '');

            return (
              <div
                key={candId}
                className={`group p-5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ${
                  c.status === 'new' ? 'bg-white border-l-4 border-l-[#E3A402]' : 'bg-slate-50/50 border-l-4 border-l-slate-200'
                }`}
                style={{ borderRadius: "2px" }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Gauche : Infos principales */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-black text-[#111111] uppercase tracking-wider" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                        {c.nom.toUpperCase()} {c.prenom}
                      </h3>
                      {getStatusBadge(c.status)}
                      <span className="text-xs text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="font-bold text-[#205C03] flex items-center gap-1">
                        <BookOpen size={14} /> {c.filiere} ({c.niveau})
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-700">
                        <Phone size={14} /> {c.telephone}
                      </span>
                      {c.email && (
                        <>
                          <span className="text-slate-300">|</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Mail size={14} /> {c.email}
                          </span>
                        </>
                      )}
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin size={14} /> {c.region}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 pt-1">
                      Diplôme : <strong>{c.dernierDiplome}</strong> ({c.anneeObtention})
                      {c.etablissementObtention ? ` - ${c.etablissementObtention}` : ''}
                    </div>
                  </div>

                  {/* Droite : Actions rapides */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
                    <Button
                      size="sm"
                      onClick={() => setSelectedCandidature(c)}
                      className="bg-[#0B30BB] hover:bg-[#0B30BB]/90 text-white font-bold text-xs uppercase tracking-wider rounded-[2px]"
                      style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                    >
                      <Eye size={14} className="mr-1" />
                      Voir détails
                    </Button>

                    <a
                      href={`https://wa.me/${formattedPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-[2px]"
                      style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                      title="Contacter sur WhatsApp"
                    >
                      <MessageSquare size={14} />
                      WhatsApp
                    </a>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(candId)}
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-[2px]"
                      title="Supprimer"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>

                </div>
              </div>
            );
          })}

          {filteredCandidatures.length === 0 && (
            <div className="text-center py-12 text-slate-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Aucune candidature trouvée.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 p-6 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-[2px]"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
            </Button>
            <span className="text-sm font-bold text-slate-600">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-[2px]"
            >
              Suivant <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Vue Détaillée d'une Candidature */}
      {selectedCandidature && (
        <div className="fixed inset-0 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white shadow-2xl my-8 overflow-hidden" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
            
            <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#E3A402] uppercase tracking-widest block">Dossier d&apos;inscription #UIJP2</span>
                <h2 className="text-2xl font-black uppercase tracking-wider" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  {selectedCandidature.nom.toUpperCase()} {selectedCandidature.prenom}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCandidature(null)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>

              {/* Changement de statut */}
              <div className="bg-slate-50 p-4 rounded-[2px] border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  Statut du dossier :
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'new', label: 'Nouveau', color: 'hover:bg-amber-500' },
                    { key: 'in_progress', label: 'En traitement', color: 'hover:bg-blue-600' },
                    { key: 'accepted', label: 'Accepté', color: 'hover:bg-emerald-600' },
                    { key: 'rejected', label: 'Refusé', color: 'hover:bg-red-600' },
                  ].map((st) => (
                    <button
                      key={st.key}
                      onClick={() => handleStatusChange(selectedCandidature._id?.toString() || '', st.key)}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors ${
                        selectedCandidature.status === st.key
                          ? 'bg-[#111111] text-white shadow'
                          : 'bg-white border border-slate-300 text-slate-600 hover:text-white ' + st.color
                      }`}
                      style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Informations Personnelles */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#205C03] border-b pb-1" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  👤 Informations Personnelles
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <div><strong>Nom :</strong> {selectedCandidature.nom.toUpperCase()}</div>
                  <div><strong>Prénom :</strong> {selectedCandidature.prenom}</div>
                  <div><strong>Sexe :</strong> {selectedCandidature.sexe}</div>
                  <div><strong>Téléphone (WhatsApp) :</strong> {selectedCandidature.telephone}</div>
                  <div className="col-span-2"><strong>Email :</strong> {selectedCandidature.email || 'Non renseigné'}</div>
                </div>
              </div>

              {/* 2. Adresse de Résidence */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0B30BB] border-b pb-1" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  📍 Adresse de Résidence
                </h3>
                <div className="grid grid-cols-3 gap-2 text-sm text-slate-700">
                  <div><strong>Région :</strong> {selectedCandidature.region}</div>
                  <div><strong>Département :</strong> {selectedCandidature.departement || 'Non renseigné'}</div>
                  <div><strong>Quartier :</strong> {selectedCandidature.communeQuartier || 'Non renseigné'}</div>
                </div>
              </div>

              {/* 3. Situation Scolaire */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#E3A402] border-b pb-1" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  📚 Situation Scolaire
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <div><strong>Dernier Diplôme :</strong> {selectedCandidature.dernierDiplome}</div>
                  <div><strong>Année :</strong> {selectedCandidature.anneeObtention}</div>
                  <div className="col-span-2"><strong>Établissement :</strong> {selectedCandidature.etablissementObtention || 'Non renseigné'}</div>
                </div>
              </div>

              {/* 4. Choix de Formation */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[2px] space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#205C03]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  🎓 Formation Demandée
                </h3>
                <div className="text-base font-bold text-slate-900">
                  {selectedCandidature.filiere}
                </div>
                <div className="text-sm font-semibold text-[#0B30BB]">
                  Niveau d&apos;étude : {selectedCandidature.niveau}
                </div>
              </div>

              {/* Contact Direct */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${selectedCandidature.telephone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-[2px] flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                >
                  <MessageSquare size={16} /> Contact WhatsApp Direct
                </a>
                {selectedCandidature.email && (
                  <a
                    href={`mailto:${selectedCandidature.email}`}
                    className="flex-1 bg-[#0B30BB] hover:bg-[#0B30BB]/90 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-[2px] flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                  >
                    <Mail size={16} /> Envoyer un Email
                  </a>
                )}
              </div>

            </div>

            <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedCandidature(null)}
                className="font-bold text-xs uppercase tracking-widest rounded-[2px]"
                style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
              >
                Fermer
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
