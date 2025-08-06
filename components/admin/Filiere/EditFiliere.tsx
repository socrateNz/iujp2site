"use client";

import { useEffect, useState, ChangeEvent } from "react";
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
      } else {
        toast.error(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier la filière</DialogTitle>
        </DialogHeader>

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
                    <Textarea rows={5} placeholder="Description" {...field} />
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
                      onChange={(selected) => field.onChange(selected.map((el) => el.name))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit" disabled={form.formState.isSubmitting || uploading}>
                {form.formState.isSubmitting || uploading ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
