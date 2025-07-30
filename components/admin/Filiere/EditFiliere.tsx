"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useEffect, useState, ChangeEvent } from "react"
import { Filiere } from "@/lib/types"

interface Ecole {
  _id: string
  title: string
}

interface Props {
  filiere: Filiere
  children: React.ReactNode
  onUpdate: (filiere: Filiere) => void
}

export default function EditFiliereDialog({ filiere, children, onUpdate }: Props) {
  const [title, setTitle] = useState(filiere.title)
  const [description, setDescription] = useState(filiere.description)
  const [duration, setDuration] = useState(String(filiere.duration))
  const [ecoleId, setEcoleId] = useState(filiere.ecoleId)
  const [examen, setExamen] = useState(filiere.examen?.join(", ") || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState(filiere.image || "")
  const [ecoles, setEcoles] = useState<Ecole[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/ecoles")
      .then((res) => res.json())
      .then((data) => {
        setEcoles(data.data?.ecoles || [])
      })
  }, [])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
      setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleUploadImage = async () => {
    if (!imageFile) return imageUrl
    const formData = new FormData()
    formData.append("file", imageFile)
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    if (data.success && data.url) return data.url
    toast.error(data.error || "Erreur upload image")
    return imageUrl
  }

  const handleSubmit = async () => {
    setLoading(true)
    const uploadedImage = await handleUploadImage()

    try {
      const res = await fetch(`/api/admin/filieres/${filiere._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          duration: Number(duration),
          image: uploadedImage,
          ecoleId,
          examen: examen.split(",").map((e) => e.trim()),
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success("Filière mise à jour avec succès")
        onUpdate(data.filiere)
      } else {
        toast.error(data.error || "Erreur lors de la mise à jour")
      }
    } catch (err) {
      toast.error("Erreur serveur lors de la mise à jour")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Modifier la filière</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Nom de la filière" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div>
            <label className="block mb-1">Image</label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && <img src={imageUrl} alt="Aperçu" className="mt-2 max-h-40 rounded" />}
          </div>
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Input
            placeholder="Durée (en années)"
            value={duration}
            type="number"
            min={1}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <div>
            <label className="block mb-1">École</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={ecoleId}
              onChange={(e) => setEcoleId(e.target.value)}
              required
            >
              <option value="">Sélectionner une école</option>
              {ecoles.map((ecole) => (
                <option key={ecole._id} value={ecole._id}>
                  {ecole.title}
                </option>
              ))}
            </select>
          </div>
          <Input placeholder="Examens (séparés par des virgules)" value={examen} onChange={(e) => setExamen(e.target.value)} />
        </div>

        <DialogFooter className="pt-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
