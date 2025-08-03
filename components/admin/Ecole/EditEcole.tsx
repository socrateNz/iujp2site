"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState, ChangeEvent } from "react"
import { Ecole } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"


interface EditArticleDialogProps {
    ecole: Ecole
    onUpdate: (updatedArticle: any) => void
    children: React.JSX.Element
}

export default function EditEcoleDialog({
    ecole,
    onUpdate,
    children,
}: EditArticleDialogProps) {
    const [title, setTitle] = useState(ecole.title)
    const [description, setDescription] = useState(ecole.description)
    const [directeur, setDirecteur] = useState(ecole.directeur || "")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState(ecole.image || "")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

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
        if (data.success && data.url) {
            return data.url
        } else {
            toast.error(data.error || "Erreur upload image")
            return imageUrl
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        const uploadedImage = await handleUploadImage()

        try {
            const res = await fetch(`/api/admin/ecoles/${ecole._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    image: uploadedImage,
                    directeur,
                }),
            })

            const data = await res.json()
            if (data.success) {
                toast.success("Article mis à jour avec succès")
                onUpdate(data.article)
                setOpen(false)
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[700px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Modifier l’article</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                    <div>
                        <p>Titre</p>
                        <Input
                            placeholder="Titre"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                    </div>
                    <div>
                        <p>Description</p>
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Image</label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Aperçu"
                                className="mt-2 max-h-40 rounded"
                            />
                        )}
                    </div>
                    <div>
                        <p>Directeur</p>
                        <Input
                            placeholder="Directeur"
                            value={directeur}
                            onChange={(e) => setDirecteur(e.target.value)}
                            required />
                    </div>
                </div>
                <DialogFooter className="pt-4">
                    <Button onClick={() => setOpen(false)} variant="outline">Annuler</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Modification..." : "Mettre à jour"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
