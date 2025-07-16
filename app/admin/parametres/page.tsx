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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Paramètres du site</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nom du site</label>
          <input
            type="text"
            name="siteName"
            value={form.siteName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1">Email de contact</label>
          <input
            type="email"
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Logo du site</label>
          <div className="flex items-center gap-4">
            {form.logoUrl && (
              <img src={form.logoUrl} alt="Logo" className="h-16 w-auto border rounded" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleLogoChange}
              className="block"
              disabled={logoUploading}
            />
            {logoUploading && <span className="text-sm">Téléchargement...</span>}
          </div>
        </div>
        <div>
          <label className="block mb-1">Réseaux sociaux</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="url" name="facebook" placeholder="Facebook" value={form.social.facebook} onChange={handleSocialChange} className="border rounded px-3 py-2" />
            <input type="url" name="twitter" placeholder="Twitter" value={form.social.twitter} onChange={handleSocialChange} className="border rounded px-3 py-2" />
            <input type="url" name="linkedin" placeholder="LinkedIn" value={form.social.linkedin} onChange={handleSocialChange} className="border rounded px-3 py-2" />
            <input type="url" name="instagram" placeholder="Instagram" value={form.social.instagram} onChange={handleSocialChange} className="border rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block mb-1">Couleur principale</label>
          <input
            type="color"
            name="mainColor"
            value={form.mainColor}
            onChange={handleChange}
            className="w-16 h-10 p-0 border-none bg-transparent"
          />
        </div>
        <div>
          <label className="block mb-1">Adresse postale</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Numéro de téléphone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Texte d'accueil / bannière</label>
          <textarea
            name="bannerText"
            value={form.bannerText}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>
        <div>
          <label className="block mb-1">Pied de page personnalisé</label>
          <textarea
            name="footer"
            value={form.footer}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
        {message && <div className="mt-2 text-center text-sm text-green-700">{message}</div>}
      </form>
    </div>
  );
} 