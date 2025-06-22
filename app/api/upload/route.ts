import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ success: false, error: "Aucun fichier reçu" }, { status: 400 });
  }
  try {
    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Upload sur Cloudinary
    const result = await uploadImage(buffer);
    if (result.success && result.url) {
      return NextResponse.json({ success: true, url: result.url });
    } else {
      return NextResponse.json({ success: false, error: result.error || "Erreur upload Cloudinary" }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Erreur upload Cloudinary" }, { status: 500 });
  }
} 