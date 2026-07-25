"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { Article } from "@/lib/types";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TiptapMenu from "@/app/admin/articles/new/TiptapMenu";

const articleFormSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  content: z.string().min(10, {
    message: "Le contenu doit contenir au moins 10 caractères.",
  }),
  category: z.string().min(1, {
    message: "La catégorie est requise.",
  }),
  author: z.string().min(2, {
    message: "L'auteur doit contenir au moins 2 caractères.",
  }),
  readTime: z.string().min(1, {
    message: "Le temps de lecture est requis.",
  }),
  published: z.boolean(),
  image: z.string().url().optional(),
});

type ArticleFormValues = z.infer<typeof articleFormSchema>;

interface EditArticleDialogProps {
  article: Article;
  onSuccess: () => void;
  children: React.ReactNode;
}

export function EditArticleDialog({ article, onSuccess, children }: EditArticleDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: article.title,
      description: article.description,
      content: article.content,
      category: article.category,
      author: article.author,
      readTime: article.readTime,
      published: article.published,
      image: article.image || "",
    },
  });

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
    content: article.content,
    onUpdate: ({ editor }: { editor: Editor }) => {
      form.setValue("content", editor.getHTML(), { shouldValidate: true });
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: article.title,
        description: article.description,
        content: article.content,
        category: article.category,
        author: article.author,
        readTime: article.readTime,
        published: article.published,
        image: article.image || "",
      });
      if (editor) {
        editor.commands.setContent(article.content || "");
      }
    }
  }, [open, article, form, editor]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previousUrl = form.getValues("image") || article.image;

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData?.success || !uploadData?.url) {
        throw new Error(uploadData?.error || "Erreur lors de l'upload de l'image");
      }

      form.setValue("image", uploadData.url, { shouldValidate: true });

      if (previousUrl && previousUrl !== uploadData.url) {
        try {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: previousUrl }),
          });
        } catch (err) {
          console.error("Erreur lors de la suppression de l'ancienne image", err);
        }
      }

      toast.success("Image mise à jour avec succès.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de l'image.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  async function onSubmit(data: ArticleFormValues) {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/admin/articles/${article._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      toast.success("L'article a été mis à jour avec succès.");

      setOpen(false);
      onSuccess();
    } catch (error) {
      toast.error("Une erreur est survenue lors de la mise à jour de l'article.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl border-l-[4px] border-l-[#205C03] border-b-[4px] border-b-[#0B30BB] rounded-[2px] p-0 overflow-hidden">
        <DialogHeader className="bg-slate-50 border-b border-slate-100 p-6">
          <DialogTitle className="text-2xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Modifier l'article</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Colonne gauche */}
                <div className="lg:col-span-1 space-y-6">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Image à la une</FormLabel>
                        <div 
                          className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${field.value ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
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
                          {uploadingImage ? (
                            <div className="flex flex-col items-center py-8">
                              <Loader2 className="animate-spin text-[#205C03] mb-2" size={24} />
                              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                            </div>
                          ) : field.value ? (
                            <div className="relative">
                              <img src={field.value} alt="Aperçu" className="w-full h-auto rounded-[2px] shadow-sm" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                                <p className="text-white text-xs font-bold uppercase tracking-widest">Changer l'image</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                              <ImageIcon className="h-10 w-10 mb-3 text-slate-300" />
                              <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Parcourir</p>
                            </div>
                          )}
                        </div>
                        <input type="hidden" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Catégorie</FormLabel>
                        <FormControl>
                          <Input placeholder="Catégorie" className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Auteur</FormLabel>
                        <FormControl>
                          <Input placeholder="Auteur" className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Temps de lecture</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 5 min" className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 bg-slate-50 p-4 rounded-[2px] border border-slate-100">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-5 w-5 rounded-[2px] border-gray-300 text-[#205C03] focus:ring-[#205C03]"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0 font-bold uppercase tracking-widest text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Publier l'article</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Colonne droite */}
                <div className="lg:col-span-2 space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Titre de l'article</FormLabel>
                        <FormControl>
                          <Input placeholder="Titre de l'article" className="rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB] font-semibold text-lg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description courte</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Description courte de l'article"
                            className="flex min-h-[100px] w-full rounded-[2px] border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B30BB]/20 focus-visible:border-[#0B30BB] disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Contenu</FormLabel>
                        <FormControl>
                          <div className="border border-slate-200 rounded-[2px] focus-within:ring-2 focus-within:ring-[#205C03]/20 focus-within:border-[#205C03] transition-all overflow-hidden bg-slate-50">
                            <input type="hidden" {...field} />
                            <div className="bg-white border-b border-slate-200 p-1">
                              <TiptapMenu editor={editor} />
                            </div>
                            <div className="min-h-[300px] p-4 bg-white prose prose-sm sm:prose-base max-w-none focus:outline-none">
                              <EditorContent editor={editor} />
                            </div>
                          </div>
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
                  disabled={loading || uploadingImage}
                  className="btn-eemi min-w-[150px] flex justify-center items-center gap-2"
                >
                  {(loading || uploadingImage) && <Loader2 className="animate-spin h-4 w-4" />}
                  {(loading || uploadingImage) ? "Mise à jour..." : "Mettre à jour"}
                </button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}