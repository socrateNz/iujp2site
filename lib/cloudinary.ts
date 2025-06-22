import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Interface pour le résultat d'upload
export interface UploadResult {
  success: boolean;
  url?: string;
  public_id?: string;
  error?: string;
}

// Upload d'image vers Cloudinary
export async function uploadImage(file: Buffer, folder: string = 'iujp2-articles'): Promise<UploadResult> {
  try {
    // Convertir le buffer en base64
    const base64Image = file.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'fill', quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Erreur upload Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur upload image'
    };
  }
}

// Suppression d'image depuis Cloudinary
export async function deleteImage(publicId: string): Promise<UploadResult> {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur suppression image'
    };
  }
}

// Optimisation d'URL Cloudinary
export function getOptimizedImageUrl(url: string, width: number = 400, height: number = 300): string {
  if (!url.includes('cloudinary.com')) {
    return url;
  }

  // Ajouter les transformations Cloudinary
  const baseUrl = url.split('/upload/')[0] + '/upload/';
  const imagePath = url.split('/upload/')[1];
  
  return `${baseUrl}c_fill,w_${width},h_${height},q_auto/${imagePath}`;
} 