"use client";

import { useEffect, useState, ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Filiere } from "@/lib/types";
import { MultiSelectUsers } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Image as ImageIcon } from "lucide-react";

interface Ecole {
  _id: string;
  title: string;
}

const formSchema = z.object({
  title: z.string().min(1),
  image: z.any(),
  description: z.string().min(1),
  duration: z.string().min(1),
  ecoleId: z.string().min(1),
  examen: z.array(z.string()).optional(),
});

export const diplomes = [
  { id: 1, name: "CERTIFICATION" },
  { id: 2, name: "BTS/HND" },
  { id: 3, name: "LICENCE" },
  { id: 4, name: "MASTER" },
  { id: 5, name: "DOCTORAT" }
];

interface Props {
  filiere: Filiere;
  children: React.ReactNode;
  onUpdate: (filiere: Filiere) => void;
}

export default function EditFiliereDialog({ filiere, children, onUpdate }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(filiere.image || "");
  const [uploading, setUploading] = useState(false);
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: filiere.title,
      image: "",
      description: filiere.description,
      duration: String(filiere.duration),
      ecoleId: filiere.ecoleId,
      examen: filiere.examen || [],
    },
  });

  useEffect(() => {
    fetch("/api/admin/ecoles")
      .then((res) => res.json())
      .then((data) => {
        setEcoles(data.data?.ecoles || []);
      });
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      form.setValue("image", e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return imageUrl;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (data.success && data.url) {
      return data.url;
    } else {
      toast.error(data.error || "Erreur upload image");
      return imageUrl;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let uploadedImageUrl = imageUrl;
    if (imageFile && !imageUrl.startsWith("http")) {
      uploadedImageUrl = await handleUploadImage();
      if (!uploadedImageUrl) return;
    }

    try {
      const res = await fetch(`/api/admin/filieres/${filiere._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          image: uploadedImageUrl,
          duration: Number(values.duration),
          examen: values.examen,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Filière mise à jour avec succès");
        onUpdate(data.filiere);
        setOpen(false);
      } else {
        toast.error(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl border-l-[4px] border-l-[#205C03] border-b-[4px] border-b-[#0B30BB] rounded-[2px] p-0 overflow-hidden">
        <DialogHeader className="bg-slate-50 border-b border-slate-100 p-6">
          <DialogTitle className="text-2xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Modifier la filière</DialogTitle>
        </DialogHeader>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Colonne gauche */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de la filière" className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03] font-semibold" {...field} />
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
                          <select className="w-full border border-slate-200 rounded-[2px] px-3 py-2 focus:ring-2 focus:ring-[#205C03] focus:border-[#205C03] outline-none text-slate-700" {...field}>
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
                          <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Diplômes</FormLabel>
                          <FormControl>
                            <MultiSelectUsers
                              elts={diplomes}
                              value={diplomes.filter((d) => field.value?.includes(d.name))}
                              onChange={(selected) => field.onChange(selected.map((el) => el.name))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormItem>
                    <FormLabel className="font-bold uppercase tracking-wider text-slate-700 block mb-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Image</FormLabel>
                    <div 
                      className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${imageUrl ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FormControl>
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                      </FormControl>
                      {uploading ? (
                        <div className="flex flex-col items-center py-4">
                          <Loader2 className="animate-spin text-[#205C03] mb-2" size={20} />
                          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                        </div>
                      ) : imageUrl ? (
                        <div className="relative">
                          <img src={imageUrl} alt="Aperçu" className="w-full max-h-32 object-cover rounded-[2px] shadow-sm bg-white" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                            <p className="text-white text-xs font-bold uppercase tracking-widest">Changer l'image</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-slate-400">
                          <ImageIcon className="h-8 w-8 mb-2 text-slate-300" />
                          <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Parcourir</p>
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
                            className="flex-1 min-h-[250px] h-full rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB] resize-none" 
                            placeholder="Description" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="pt-6 border-t border-slate-100">
                <Button type="button" onClick={() => setOpen(false)} variant="outline" className="rounded-[2px] font-bold uppercase tracking-widest text-slate-600 bg-white" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Annuler</Button>
                <button 
                  type="submit" 
                  disabled={form.formState.isSubmitting || uploading}
                  className="btn-eemi min-w-[150px] flex justify-center items-center gap-2"
                >
                  {(form.formState.isSubmitting || uploading) && <Loader2 className="animate-spin h-4 w-4" />}
                  {(form.formState.isSubmitting || uploading) ? "Mise à jour..." : "Mettre à jour"}
                </button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
