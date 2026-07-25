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
import { useState, ChangeEvent, useRef } from "react"
import { Ecole } from "@/lib/types"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Image as ImageIcon } from "lucide-react"

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
    const [uploading, setUploading] = useState(false)
    const [open, setOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUploadImage = async () => {
        if (!imageFile) return imageUrl
        setUploading(true)
        const formData = new FormData()
        formData.append("file", imageFile)
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })
        const data = await res.json()
        setUploading(false)
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
                toast.success("École mise à jour avec succès")
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
            <DialogContent className="sm:max-w-2xl border-l-[4px] border-l-[#205C03] border-b-[4px] border-b-[#0B30BB] rounded-[2px] p-0 overflow-hidden">
                <DialogHeader className="bg-slate-50 border-b border-slate-100 p-6">
                    <DialogTitle className="text-2xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Modifier l'école</DialogTitle>
                </DialogHeader>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom de l'école</label>
                                <Input
                                    placeholder="Ex: IUT de Bandjoun"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03] font-semibold"
                                    required 
                                />
                            </div>
                            
                            <div>
                                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nom du Directeur</label>
                                <Input
                                    placeholder="Pr. Jean Dupont"
                                    value={directeur}
                                    onChange={(e) => setDirecteur(e.target.value)}
                                    className="rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]"
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Image</label>
                                <div 
                                  className={`border-2 border-dashed rounded-[2px] p-4 text-center cursor-pointer transition-colors ${imageUrl ? 'border-[#205C03] bg-[#205C03]/5' : 'border-slate-300 hover:border-[#0B30BB] hover:bg-slate-50'}`}
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                  />
                                  {uploading ? (
                                    <div className="flex flex-col items-center py-6">
                                      <Loader2 className="animate-spin text-[#205C03] mb-2" size={24} />
                                      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload...</p>
                                    </div>
                                  ) : imageUrl ? (
                                    <div className="relative">
                                      <img src={imageUrl} alt="Aperçu" className="w-full max-h-32 object-contain rounded-[2px] shadow-sm bg-white" />
                                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2px]">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest">Changer l'image</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center py-6 text-slate-400">
                                      <ImageIcon className="h-10 w-10 mb-3 text-slate-300" />
                                      <p className="text-sm font-bold uppercase tracking-widest text-slate-500" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Parcourir les fichiers</p>
                                    </div>
                                  )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="block mb-2 text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Description complète</label>
                            <Textarea
                                placeholder="Décrivez l'école, sa mission, ses valeurs..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="flex-1 min-h-[200px] rounded-[2px] focus:ring-[#0B30BB] focus:border-[#0B30BB] resize-none"
                                required 
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
                    <Button onClick={() => setOpen(false)} variant="outline" className="rounded-[2px] font-bold uppercase tracking-widest text-slate-600 bg-white" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Annuler</Button>
                    <button 
                      onClick={handleSubmit} 
                      disabled={loading || uploading}
                      className="btn-eemi min-w-[150px] flex justify-center items-center gap-2"
                    >
                        {(loading || uploading) && <Loader2 className="animate-spin h-4 w-4" />}
                        {(loading || uploading) ? "Modification..." : "Mettre à jour"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
