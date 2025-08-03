"use client";

import { useEffect, useState } from 'react';
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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nouvelle filière</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la filière" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IMAGE */}
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </FormControl>
            {imageUrl && <img src={imageUrl} alt="Aperçu" className="mt-2 max-h-40 rounded" />}
          </FormItem>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durée (en années)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} placeholder="Ex: 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ECOLE */}
          <FormField
            control={form.control}
            name="ecoleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>École</FormLabel>
                <FormControl>
                  <select className="w-full border rounded px-3 py-2" {...field}>
                    <option value="">Sélectionner une école</option>
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

          {/* EXAMENS */}
          <FormField
            control={form.control}
            name="examen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diplômes</FormLabel>
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

          <Button type="submit" disabled={form.formState.isSubmitting || uploading}>
            {(form.formState.isSubmitting || uploading) ? 'Création...' : 'Créer'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
