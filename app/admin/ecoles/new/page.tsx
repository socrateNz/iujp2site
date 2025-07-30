"use client";

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function NewEcolePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [directeur, setDirecteur] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nouvelle école</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Nom de l'école" value={title} onChange={e => setTitle(e.target.value)} required />
        <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <div>
          <label className="block mb-1">Image</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} required />
          {imageUrl && <img src={imageUrl} alt="Aperçu" className="mt-2 max-h-40 rounded" />}
        </div>
        <Input placeholder="Directeur (optionnel)" value={directeur} onChange={e => setDirecteur(e.target.value)} />
        <Button type="submit" disabled={loading || uploading}>
          {loading || uploading ? (
            <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Création...</span>
          ) : (
            'Créer'
          )}
        </Button>
      </form>
    </div>
  );
} 