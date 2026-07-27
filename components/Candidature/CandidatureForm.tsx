"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Send,
  AlertCircle,
  Building,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface FiliereOption {
  _id?: string;
  title: string;
}

export default function CandidatureForm({ initialFiliere }: { initialFiliere?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Déterminer la filière sélectionnée par URL ou prop
  const filiereParam = initialFiliere || searchParams.get('filiere') || searchParams.get('matiere') || '';

  const [filieres, setFilieres] = useState<FiliereOption[]>([]);
  const [loadingFilieres, setLoadingFilieres] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // État du formulaire avec la structure exacte du Google Form
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    sexe: 'M',
    telephone: '',
    email: '',

    // Adresse de résidence
    region: '',
    departement: '',
    communeQuartier: '',

    // Situation scolaire
    dernierDiplome: 'BAC ESG',
    autreDiplome: '',
    anneeObtention: new Date().getFullYear().toString(),
    etablissementObtention: '',

    // Choix de filière
    filiere: filiereParam,
    niveau: 'Niv 1',
  });

  // Mettre à jour la filière si les paramètres d'URL changent
  useEffect(() => {
    if (filiereParam) {
      setFormData(prev => ({ ...prev, filiere: filiereParam }));
    }
  }, [filiereParam]);

  // Récupérer les filières existantes en base de données
  useEffect(() => {
    async function fetchFilieres() {
      try {
        const res = await fetch('/api/admin/filieres?limit=100');
        const data = await res.json();
        if (data.success && data.data?.filieres) {
          setFilieres(data.data.filieres);
        }
      } catch (err) {
        console.error('Erreur chargement des filières:', err);
      } finally {
        setLoadingFilieres(false);
      }
    }
    fetchFilieres();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation locale
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.region || !formData.anneeObtention || !formData.filiere) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires (*)');
      toast.error('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    const finalDiplome = formData.dernierDiplome === 'Autre' ? (formData.autreDiplome || 'Autre') : formData.dernierDiplome;

    setSubmitting(true);

    try {
      const response = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          dernierDiplome: finalDiplome,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        toast.success('Votre candidature a été envoyée avec succès !');
      } else {
        setErrorMessage(result.error || 'Erreur lors de la soumission.');
        toast.error(result.error || 'Erreur lors de la soumission.');
      }
    } catch (err) {
      console.error('Erreur réseau candidature:', err);
      setErrorMessage('Une erreur réseau est survenue. Veuillez rééessayer.');
      toast.error('Une erreur réseau est survenue.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-t-8 border-[#205C03]" style={{ borderRadius: '2px' }}>
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-[#205C03] mb-2">
            <CheckCircle2 size={48} />
          </div>

          <h2 className="text-3xl font-black text-[#111111] uppercase tracking-wider" style={{ fontFamily: 'var(--font-oswald), Oswald, sans-serif' }}>
            Candidature Transmise avec Succès !
          </h2>

          <p className="text-slate-600 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Merci <strong>{formData.prenom} {formData.nom}</strong>. Votre dossier d&apos;inscription pour la filière <strong className="text-[#205C03]">{formData.filiere}</strong> ({formData.niveau}) a bien été enregistré.
          </p>

          <div className="bg-slate-50 p-6 text-left border border-slate-200 rounded-[2px] max-w-lg mx-auto space-y-2 text-sm text-slate-700">
            <p className="font-bold text-[#0B30BB] uppercase tracking-wider text-xs mb-3" style={{ fontFamily: 'var(--font-oswald), Oswald, sans-serif' }}>Récapitulatif de soumission</p>
            <p><strong>Candidat :</strong> {formData.nom.toUpperCase()} {formData.prenom}</p>
            <p><strong>Téléphone WhatsApp :</strong> {formData.telephone}</p>
            <p><strong>Filière choisie :</strong> {formData.filiere}</p>
            <p><strong>Niveau choisi :</strong> {formData.niveau}</p>
          </div>

          <p className="text-sm text-slate-500 italic">
            Notre service des admissions étudiera votre dossier et vous contactera rapidement par WhatsApp ou appel téléphonique.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => router.push('/formations')}
              className="bg-[#205C03] hover:bg-[#205C03]/90 text-white font-bold uppercase tracking-widest px-8 py-3 text-sm"
              style={{ borderRadius: '2px', fontFamily: 'var(--font-oswald), Oswald, sans-serif' }}
            >
              Découvrir les autres formations
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  nom: '',
                  prenom: '',
                  sexe: 'M',
                  telephone: '',
                  email: '',
                  region: '',
                  departement: '',
                  communeQuartier: '',
                  dernierDiplome: 'BAC ESG',
                  autreDiplome: '',
                  anneeObtention: new Date().getFullYear().toString(),
                  etablissementObtention: '',
                  filiere: '',
                  niveau: 'Niv 1',
                });
              }}
              variant="outline"
              className="border-slate-300 hover:bg-slate-100 text-slate-700 font-bold uppercase tracking-widest px-8 py-3 text-sm"
              style={{ borderRadius: '2px', fontFamily: 'var(--font-oswald), Oswald, sans-serif' }}
            >
              Faire une autre inscription
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>

      {/* ── En-tête officiel UIJP2 (Formulaire d'inscription) ── */}
      <div className="bg-gradient-to-r from-[#205C03] via-[#0B30BB] to-[#205C03] text-white p-8 md:p-10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
            Année Académique  {new Date().getFullYear().toString()} – {new Date().getFullYear() + 1}
          </div>

          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wider mb-4 leading-tight" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
            📝 Formulaire d’Inscription Officiel
          </h1>

          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Bienvenue à l’<strong>Université Internationale Jean Paul II de Bafang</strong>, un établissement d’excellence où la pratique, l’éthique, la discipline et la formation de qualité sont au cœur de notre mission.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 pt-4 border-t border-white/20 text-xs font-semibold uppercase tracking-wider text-white/90">
            <span>🏫 ISB (Bafang)</span>
            <span>🏥 FASA (Santé)</span>
            <span>👩‍⚕️ ESS-ISB (IDE)</span>
            <span>🌍 KESMOND UNIV</span>
          </div>
        </div>
      </div>

      {/* ── Corps du Formulaire ── */}
      <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">

        {errorMessage && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-[2px]">
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {/* 1. INFORMATIONS PERSONNELLES */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-[#205C03]">
            <div className="w-8 h-8 rounded-[2px] bg-[#205C03] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              INFORMATIONS PERSONNELLES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Nom(s) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Ex: TCHAMBA"
                  required
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Prénom(s) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Ex: Jean Paul"
                  required
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Sexe <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 text-sm">
                  <input
                    type="radio"
                    name="sexe"
                    value="M"
                    checked={formData.sexe === 'M'}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#205C03] focus:ring-[#205C03]"
                  />
                  Masculin (M)
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 text-sm">
                  <input
                    type="radio"
                    name="sexe"
                    value="F"
                    checked={formData.sexe === 'F'}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#205C03] focus:ring-[#205C03]"
                  />
                  Féminin (F)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Téléphone (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-[#205C03]" />
                <Input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Ex: +237 690 00 00 00"
                  required
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Adresse E-mail <span className="text-slate-400 font-normal">(Facultatif)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: etudiant@gmail.com"
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. ADRESSE DE RÉSIDENCE */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-[#0B30BB]">
            <div className="w-8 h-8 rounded-[2px] bg-[#0B30BB] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              ADRESSE DE RÉSIDENCE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Région <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="Ex: Ouest / Littoral"
                  required
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#0B30BB] focus:border-[#0B30BB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Département <span className="text-slate-400 font-normal">(Facultatif)</span>
              </label>
              <Input
                type="text"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
                placeholder="Ex: Haut-Nkam"
                className="rounded-[2px] border-slate-300 focus:ring-[#0B30BB] focus:border-[#0B30BB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Commune / Quartier <span className="text-slate-400 font-normal">(Facultatif)</span>
              </label>
              <Input
                type="text"
                name="communeQuartier"
                value={formData.communeQuartier}
                onChange={handleChange}
                placeholder="Ex: Bafang - Quartier 1"
                className="rounded-[2px] border-slate-300 focus:ring-[#0B30BB] focus:border-[#0B30BB]"
              />
            </div>
          </div>
        </div>

        {/* 3. SITUATION SCOLAIRE */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-[#E3A402]">
            <div className="w-8 h-8 rounded-[2px] bg-[#E3A402] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              SITUATION SCOLAIRE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Dernier diplôme obtenu <span className="text-red-500">*</span>
              </label>
              <select
                name="dernierDiplome"
                value={formData.dernierDiplome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#E3A402] bg-white text-sm"
              >
                <option value="BAC ESG">BAC ESG (Enseignement Secondaire Général)</option>
                <option value="GCE">GCE A-Level</option>
                <option value="BAC TECH">BAC TECH / Technique</option>
                <option value="Autre">Autre diplôme...</option>
              </select>
            </div>

            {formData.dernierDiplome === 'Autre' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                  Précisez le diplôme <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="autreDiplome"
                  value={formData.autreDiplome}
                  onChange={handleChange}
                  placeholder="Ex: BTS / Licence / HND"
                  required
                  className="rounded-[2px] border-slate-300 focus:ring-[#E3A402] focus:border-[#E3A402]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Année d’obtention <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="anneeObtention"
                  value={formData.anneeObtention}
                  onChange={handleChange}
                  placeholder="Ex: 2024"
                  required
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#E3A402] focus:border-[#E3A402]"
                />
              </div>
            </div>

            <div className={formData.dernierDiplome === 'Autre' ? 'md:col-span-1' : 'md:col-span-1'}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Établissement d&apos;obtention <span className="text-slate-400 font-normal">(Facultatif)</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="etablissementObtention"
                  value={formData.etablissementObtention}
                  onChange={handleChange}
                  placeholder="Ex: Lycée Bilingue de Bafang"
                  className="pl-10 rounded-[2px] border-slate-300 focus:ring-[#E3A402] focus:border-[#E3A402]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. CHOIX DE LA FORMATION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b-2 border-[#205C03]">
            <div className="w-8 h-8 rounded-[2px] bg-[#205C03] text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              CHOIX DE LA FORMATION
            </h2>
          </div>

          <div className="bg-emerald-50/60 p-6 border border-emerald-200 rounded-[2px] space-y-6">

            {/* Saisie ou sélection automatique de la filière */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Filière choisie <span className="text-red-500">*</span>
              </label>

              {filiereParam ? (
                <div className="space-y-2">
                  <div className="p-3.5 bg-white border-2 border-[#205C03] rounded-[2px] flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <BookOpen size={20} className="text-[#205C03]" />
                      <div>
                        <span className="text-xs font-bold text-[#205C03] uppercase tracking-wider block">Filière pré-sélectionnée</span>
                        <span className="text-base font-bold text-slate-900">{formData.filiere}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-[#205C03] text-white font-bold px-2.5 py-1 uppercase tracking-widest rounded-[2px]">Sélectionnée</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Vous souhaitez changer de filière ? Choisissez dans la liste ci-dessous.
                  </p>
                </div>
              ) : null}

              {/* Champ de sélection ou saisie libre */}
              <div className="mt-3">
                {filieres.length > 0 ? (
                  <select
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#205C03] bg-white text-sm font-semibold text-slate-800"
                  >
                    <option value="">-- Sélectionnez votre filière --</option>
                    {filieres.map(f => (
                      <option key={f._id || f.title} value={f.title}>
                        {f.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type="text"
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleChange}
                    placeholder="Saisissez le nom de la filière désirée..."
                    required
                    className="rounded-[2px] border-slate-300 focus:ring-[#205C03] focus:border-[#205C03]"
                  />
                )}
              </div>
            </div>

            {/* Niveau d'étude */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                Niveau d&apos;études choisi <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {['Niv 1', 'Niv 2', 'Niv 3', 'Niv 4', 'NIV 5', 'Doctorat PHD'].map((niv) => (
                  <label
                    key={niv}
                    className={`flex items-center justify-center p-3 border-2 text-center cursor-pointer transition-all ${formData.niveau === niv
                      ? 'border-[#205C03] bg-[#205C03] text-white font-bold shadow-md'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-[#205C03]'
                      }`}
                    style={{ borderRadius: '2px', fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                  >
                    <input
                      type="radio"
                      name="niveau"
                      value={niv}
                      checked={formData.niveau === niv}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-sm uppercase tracking-wider">{niv}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bouton de Soumission */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            En soumettant ce formulaire, vous confirmez l&apos;exactitude des informations transmises.
          </p>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto btn-uijp !px-10 !py-4 text-base shadow-lg shadow-[#205C03]/20 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={18} />
                Soumettre ma candidature
              </>
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}
