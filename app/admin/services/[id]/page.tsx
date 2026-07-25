"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/admin/services/${params.id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setFormData({
            name: data.data.name || '',
            email: data.data.email || '',
            description: data.data.description || '',
          });
        }
      } catch (error) {
        console.error('Erreur récupération:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/services/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/services');
        router.refresh();
      } else {
        alert(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#205C03]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/services">
          <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:shadow-md transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Modifier le Service</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Modifier les détails du service de contact</p>
        </div>
      </div>

      <div className="bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold uppercase tracking-wider text-slate-700 text-xs" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom du service</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-[2px] focus-visible:ring-[#205C03]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold uppercase tracking-wider text-slate-700 text-xs" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Email du service</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="rounded-[2px] focus-visible:ring-[#205C03]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-bold uppercase tracking-wider text-slate-700 text-xs" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[120px] rounded-[2px] focus-visible:ring-[#205C03]"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-eemi flex items-center gap-2"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
