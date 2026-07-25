"use client";

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MultiSelectUsers } from '@/components/ui/multi-select';
import { diplomes } from '@/data/data';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1),
  image: z.any(),
  description: z.string().min(1),
  duration: z.string().min(1),
  ecoleId: z.string().min(1),
  examen: z.array(z.string()).optional(),
});

interface Ecole {
  _id: string;
  title: string;
}

export default function NewFilierePage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      duration: '',
      ecoleId: '',
      examen: [],
    },
  });

  useEffect(() => {
    fetch('/api/admin/ecoles')
      .then(res => res.json())
      .then(data => {
        setEcoles(data.data?.ecoles || []);
      });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      form.setValue('image', e.target.files[0]);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let uploadedImageUrl = imageUrl;
    if (imageFile && !imageUrl.startsWith('http')) {
      uploadedImageUrl = await handleUploadImage();
      if (!uploadedImageUrl) return;
    }

    try {
      const res = await fetch('/api/admin/filieres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          image: uploadedImageUrl,
          duration: Number(values.duration),
          examen: values.examen,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Filière créée avec succès');
        router.push('/admin/filieres');
      } else {
        toast.error(data.error || 'Erreur lors de la création');
      }
    } catch (err) {
      toast.error('Erreur lors de la création');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/filieres">
          <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:bg-slate-100 text-slate-500 hover:text-slate-900 border-slate-200">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nouvelle filière</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Ajoutez un programme de formation à une école.</p>
        </div>
      </div>

      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Colonne gauche */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom de la filière</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Bachelor Web Marketing" className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03] font-semibold text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ecoleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>École de rattachement</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full border border-slate-200 rounded-[2px] px-3 py-2.5 focus:ring-2 focus:ring-[#205C03] focus:border-[#205C03] outline-none transition-all text-slate-700" 
                          {...field}
                        >
                          <option value="">-- Sélectionner une école --</option>
                          {ecoles.map((ecole) => (
                            <option key={ecole._id} value={ecole._id}>
                              {ecole.title}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Durée (en années)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} placeholder="Ex: 3" className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Diplômes obtenus</FormLabel>
                        <FormControl>
                          <MultiSelectUsers
                            elts={diplomes}
                            value={diplomes.filter((d) => field.value?.includes(d.name))}
                            onChange={(selected) =>
                              field.onChange(selected.map((el) => el.name))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel className="font-bold uppercase tracking-wider text-slate-700 block mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Image d'illustration</FormLabel>
                  <div 
                    className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${imageUrl ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FormControl>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        ref={fileInputRef}
                        className="hidden" 
                      />
                    </FormControl>
                    {uploading ? (
                      <div className="flex flex-col items-center py-6">
                        <Loader2 className="animate-spin text-[#205C03] mb-2" size={24} />
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                      </div>
                    ) : imageUrl ? (
                      <div className="relative">
                        <img src={imageUrl} alt="Aperçu" className="w-full max-h-40 object-cover rounded-[2px] shadow-sm bg-white" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                          <p className="text-white text-xs font-bold uppercase tracking-widest">Changer l'image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                        <ImageIcon className="h-10 w-10 mb-3 text-slate-300" />
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Parcourir les fichiers</p>
                        <p className="text-xs mt-1">Illustration de la filière</p>
                      </div>
                    )}
                  </div>
                </FormItem>
              </div>

              {/* Colonne droite */}
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col h-full">
                      <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description complète</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea 
                          className="flex-1 min-h-[300px] h-full rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB] resize-none" 
                          placeholder="Décrivez les objectifs, le programme et les débouchés de cette filière..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Link href="/admin/filieres">
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
                disabled={form.formState.isSubmitting || uploading} 
                className="btn-eemi flex items-center justify-center min-w-[150px]"
              >
                {(form.formState.isSubmitting || uploading) ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
                {(form.formState.isSubmitting || uploading) ? 'Création...' : 'Créer la filière'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
