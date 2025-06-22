import { ObjectId } from 'mongodb';

// Types pour les utilisateurs
export interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  password?: string; // Optionnel pour les réponses API
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
  };
  expires: string;
}

// Types pour les articles
export interface Article {
  _id?: ObjectId;
  title: string;
  description: string;
  content: string;
  image: string;
  imagePublicId?: string; // Pour Cloudinary
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface CreateArticleData {
  title: string;
  description: string;
  content: string;
  image: string;
  imagePublicId?: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
}

export interface UpdateArticleData extends Partial<CreateArticleData> {
  id: string;
}

// Types pour les messages de contact
export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
  repliedAt?: Date;
  replyMessage?: string;
  adminName?: string;
}

export interface CreateContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ReplyContactData {
  messageId: string;
  replyMessage: string;
  adminName: string;
}

// Types pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Types pour l'authentification
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

// Types pour les statistiques admin
export interface AdminStats {
  totalUsers: number;
  totalArticles: number;
  totalContacts: number;
  newContacts: number;
  publishedArticles: number;
  draftArticles: number;
}

// Types pour les filtres et pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ArticleFilters {
  category?: string;
  published?: boolean;
  search?: string;
}

export interface ContactFilters {
  status?: 'new' | 'read' | 'replied';
  search?: string;
}

// Types pour les composants UI
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface SelectOption {
  value: string;
  label: string;
} 