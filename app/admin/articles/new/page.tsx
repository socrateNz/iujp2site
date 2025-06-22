"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

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
      const author = session?.user?.name || "";
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
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouvel article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <div>
              <label className="block mb-1 font-medium">Titre</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Input value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Catégorie</label>
              <Input value={category} onChange={e => setCategory(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Contenu</label>
              <Textarea value={content} onChange={e => setContent(e.target.value)} rows={6} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Temps de lecture (ex: 5 min)</label>
              <Input value={readTime} onChange={e => setReadTime(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
              {uploading && <div className="text-blue-500">Upload en cours...</div>}
              {image && (
                <div className="mt-2">
                  <img src={image} alt="Aperçu" className="max-h-40 rounded" />
                </div>
              )}
            </div>
            <Button type="submit" disabled={loading || uploading} className="w-full">
              {loading ? "Création..." : "Créer l'article"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 