"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const defaultSocial = { facebook: "", twitter: "", linkedin: "", instagram: "" };

export default function ParametresSitePage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    siteName: "",
    description: "",
    contactEmail: "",
    logoUrl: "",
    social: { ...defaultSocial },
    mainColor: "#0057b7",
    address: "",
    phone: "",
    footer: "",
    bannerText: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [initLoading, setInitLoading] = useState(true);
  const [logoUploading, setLogoUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "admin") {
      fetch("/api/admin/settings", { credentials: "include" })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setForm({
              siteName: data.data.siteName || "",
              description: data.data.description || "",
              contactEmail: data.data.contactEmail || "",
              logoUrl: data.data.logoUrl || "",
              social: { ...defaultSocial, ...data.data.social },
              mainColor: data.data.mainColor || "#0057b7",
              address: data.data.address || "",
              phone: data.data.phone || "",
              footer: data.data.footer || "",
              bannerText: data.data.bannerText || ""
            });
          }
        })
        .finally(() => setInitLoading(false));
    } else if (status !== "loading") {
      setInitLoading(false);
    }
  }, [status, session]);

  if (initLoading) return <div>Chargement...</div>;
  if (!session || session.user.role !== "admin") return <div>Accès non autorisé</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, social: { ...form.social, [e.target.name]: e.target.value } });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setForm(f => ({ ...f, logoUrl: data.url }));
        setMessage("Logo téléchargé !");
      } else {
        setMessage(data.error || "Erreur lors de l'upload du logo");
      }
    } catch (err) {
      setMessage("Erreur lors de l'upload du logo");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Paramètres enregistrés !");
      } else {
        setMessage(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Paramètres du site</h1>
        <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Configurez les informations générales de l'université.</p>
      </div>

      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Colonne Gauche - Infos Générales */}
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom du site</label>
                <input
                  type="text"
                  name="siteName"
                  value={form.siteName}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03] min-h-[100px] resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Texte d'accueil / bannière</label>
                <textarea
                  name="bannerText"
                  value={form.bannerText}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]"
                  rows={2}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Couleur principale</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    name="mainColor"
                    value={form.mainColor}
                    onChange={handleChange}
                    className="w-12 h-12 p-1 border border-slate-200 rounded-[2px] cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-600 bg-slate-50 px-3 py-2 border border-slate-200 rounded-[2px]">{form.mainColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Logo du site</label>
                <div 
                  className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${form.logoUrl ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    className="hidden"
                    disabled={logoUploading}
                  />
                  {logoUploading ? (
                    <div className="flex flex-col items-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#205C03] mb-2"></div>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                    </div>
                  ) : form.logoUrl ? (
                    <div className="relative">
                      <img src={form.logoUrl} alt="Logo" className="max-h-24 mx-auto object-contain bg-white rounded-[2px]" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">Changer le logo</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Parcourir les fichiers</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Colonne Droite - Contact et Réseaux */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Contact & Coordonnées</h3>
              
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Email de contact</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Numéro de téléphone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Adresse postale</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>

              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-2 pt-4" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Réseaux sociaux</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <input type="url" name="facebook" placeholder="URL Facebook" value={form.social.facebook} onChange={handleSocialChange} className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]" />
                <input type="url" name="twitter" placeholder="URL Twitter (X)" value={form.social.twitter} onChange={handleSocialChange} className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]" />
                <input type="url" name="linkedin" placeholder="URL LinkedIn" value={form.social.linkedin} onChange={handleSocialChange} className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]" />
                <input type="url" name="instagram" placeholder="URL Instagram" value={form.social.instagram} onChange={handleSocialChange} className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]" />
              </div>

              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-2 pt-4" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Pied de page</h3>
              
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Pied de page personnalisé</label>
                <textarea
                  name="footer"
                  value={form.footer}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-[#205C03] focus:border-[#205C03]"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {message && <div className={`text-sm font-bold px-4 py-2 rounded-[2px] ${message.includes('Erreur') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>{message}</div>}
            {!message && <div></div>}
            
            <button
              type="submit"
              className="btn-eemi flex items-center justify-center min-w-[150px]"
              disabled={loading}
            >
              {loading ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                   Enregistrement...
                 </>
              ) : "Enregistrer les paramètres"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 