import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

// Body attendu : { url: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body as { url?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL d'image manquante" },
        { status: 400 }
      );
    }

    // On récupère le public_id à partir de l'URL Cloudinary
    // Exemple d'URL :
    // https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/iujp2-articles/abc123.jpg
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) {
      return NextResponse.json(
        { success: false, error: "URL Cloudinary invalide" },
        { status: 400 }
      );
    }

    const publicIdWithVersion = url.substring(uploadIndex + "/upload/".length);
    // On enlève la partie version ("v123456.../") si présente
    const publicId = publicIdWithVersion.replace(/^v\d+\//, "").replace(/\.[a-zA-Z0-9]+$/, "");

    const result = await deleteImage(publicId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Erreur lors de la suppression de l'image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erreur lors de la suppression de l'image" },
      { status: 500 }
    );
  }
}


