"use client";

import { useState, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function NewEcolePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [directeur, setDirecteur] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return '';
    setUploading(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (data.success && data.url) {
      return data.url;
    } else {
      toast.error(data.error || 'Erreur upload image');
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let uploadedImageUrl = imageUrl;
    if (imageFile && !imageUrl.startsWith('http')) {
      uploadedImageUrl = await handleUploadImage();
      if (!uploadedImageUrl) {
        setLoading(false);
        return;
      }
    }
    try {
      const res = await fetch('/api/admin/ecoles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          image: uploadedImageUrl,
          directeur,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('École créée avec succès');
        router.push('/admin/ecoles');
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (err) {
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/ecoles">
          <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:bg-slate-100 text-slate-500 hover:text-slate-900 border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nouvelle école</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Ajoutez un nouvel établissement ou institut.</p>
        </div>
      </div>

      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom de l'école</label>
                <Input 
                  placeholder="Ex: IUT de Bandjoun" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                  className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03] font-semibold text-lg"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom du Directeur</label>
                <Input 
                  placeholder="Pr. Jean Dupont" 
                  value={directeur} 
                  onChange={e => setDirecteur(e.target.value)} 
                  required 
                  className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Image</label>
                <div 
                  className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${imageUrl ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                    required={!imageUrl}
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center py-6">
                      <Loader2 className="animate-spin text-[#205C03] mb-2" size={24} />
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                    </div>
                  ) : imageUrl ? (
                    <div className="relative">
                      <img src={imageUrl} alt="Aperçu" className="w-full max-h-48 object-contain rounded-[2px] shadow-sm bg-white" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">Changer l'image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                      <ImageIcon className="h-10 w-10 mb-3 text-slate-300" />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Parcourir les fichiers</p>
                      <p className="text-xs mt-1">Logo ou photo de l'établissement</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col">
              <div className="flex-1 flex flex-col">
                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description complète</label>
                <Textarea 
                  className="flex-1 min-h-[250px] rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB] resize-none" 
                  placeholder="Décrivez l'école, sa mission, ses valeurs..." 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Link href="/admin/ecoles">
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
              {loading || uploading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
              {loading || uploading ? "Création..." : "Créer l'école"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}