"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Loader2 } from "lucide-react";
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

// Schéma de validation
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

      // Met à jour le champ image avec la nouvelle URL
      form.setValue("image", uploadData.url, { shouldValidate: true });

      // Supprime l'ancienne image si elle existe et est différente
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
          // On ne bloque pas l'édition si la suppression échoue
          console.error("Erreur lors de la suppression de l'ancienne image", err);
        }
      }

      toast.success("Image mise à jour avec succès.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de l'image.");
    } finally {
      setUploadingImage(false);
      // reset de l'input fichier pour pouvoir re-upload la même image si besoin
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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'article</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'article" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Description courte de l'article"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                  <FormItem className="md:col-span-2">
                    <FormLabel>Contenu</FormLabel>
                    <FormControl>
                      <div className="border rounded">
                        <input type="hidden" {...field} />
                        <TiptapMenu editor={editor} />
                        <div className="min-h-[200px] p-2">
                          <EditorContent editor={editor} />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <FormControl>
                      <Input placeholder="Catégorie" {...field} />
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
                    <FormLabel>Auteur</FormLabel>
                    <FormControl>
                      <Input placeholder="Auteur" {...field} />
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
                    <FormLabel>Temps de lecture</FormLabel>
                    <FormControl>
                      <Input placeholder="5 min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {/* Aperçu de l'image actuelle */}
                        {field.value ? (
                          <div className="mt-2">
                            <img
                              src={field.value}
                              alt="Aperçu"
                              className="max-h-40 rounded border"
                            />
                          </div>
                        ) : <Loader2 className="h-4 w-4 animate-spin" />}

                        {/* Input fichier pour remplacer l'image */}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />

                        {uploadingImage && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Mise à jour de l'image...</span>
                          </div>
                        )}

                        {/* Champ caché pour conserver l'URL dans le formulaire */}
                        <input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Publier l'article</FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}