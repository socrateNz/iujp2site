"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Loader2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TiptapMenu from "./TiptapMenu";
import Link from "next/link";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [readTime, setReadTime] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      Youtube,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }: { editor: Editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImage(data.url);
      } else {
        setError(data.error || "Erreur lors de l'upload de l'image");
      }
    } catch (err) {
      setError("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const author = session?.user?.name || "Administrateur";
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, content, image, author, readTime }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/articles");
      } else {
        setError(data.error || "Erreur lors de la création de l'article");
      }
    } catch (err) {
      setError("Erreur lors de la création de l'article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/articles">
          <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:bg-slate-100 text-slate-500 hover:text-slate-900 border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Créer un article</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Rédigez un nouveau contenu pour le blog.</p>
        </div>
      </div>

      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-[2px] text-sm font-medium border border-red-100">{error}</div>}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche - Image et Meta */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Image à la une</label>
                <div 
                  className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${image ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center py-8">
                      <Loader2 className="animate-spin text-[#205C03] mb-2" size={24} />
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                    </div>
                  ) : image ? (
                    <div className="relative">
                      <img src={image} alt="Aperçu" className="w-full h-auto rounded-[2px] shadow-sm" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">Changer l'image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                      <ImageIcon className="h-10 w-10 mb-3 text-slate-300" />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Cliquez pour ajouter</p>
                      <p className="text-xs mt-1">Format recommandé: 16:9</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Catégorie</label>
                <Input 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  required 
                  placeholder="Ex: Actualités"
                  className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Temps de lecture</label>
                <Input 
                  value={readTime} 
                  onChange={e => setReadTime(e.target.value)} 
                  required 
                  placeholder="Ex: 5 min"
                  className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>
            </div>

            {/* Colonne droite - Contenu principal */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Titre de l'article</label>
                <Input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                  placeholder="Saisissez un titre accrocheur"
                  className="text-lg rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB] font-semibold"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description courte</label>
                <Input 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  required 
                  placeholder="Résumé de l'article pour les listes"
                  className="rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB]"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Contenu de l'article</label>
                <div className="border border-slate-200 rounded-[2px] focus-within:ring-2 focus-within:ring-[#205C03]/20 focus-within:border-[#205C03] transition-all overflow-hidden bg-slate-50">
                  <div className="bg-white border-b border-slate-200 p-1">
                    <TiptapMenu editor={editor} />
                  </div>
                  <div className="min-h-[300px] p-4 bg-white prose prose-sm sm:prose-base max-w-none focus:outline-none">
                    <EditorContent editor={editor} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Link href="/admin/articles">
              <button
                type="button"
                className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                style={{ borderRadius: "2px", fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
              >
                Annuler
              </button>
            </Link>
            <button 
              type="submit" 
              disabled={loading || uploading} 
              className="btn-eemi flex items-center justify-center min-w-[150px]"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
              {loading ? "Création..." : "Publier l'article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}