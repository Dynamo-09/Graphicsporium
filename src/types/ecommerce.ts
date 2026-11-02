export interface Ebook {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number; // in INR
  originalPrice?: number; // for discount badge
  coverImage: string;
  pdfFilePath: string; // internal path to raw source PDF
  samplePdfPath?: string; // optional preview / sample chapter
  pages: number;
  format: 'PDF' | 'EPUB';
  category: string;
  badge?: string; // e.g. "Bestseller", "New Launch"
  highlights?: string[]; // bullet points of what's inside
}

export interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  ebookId: string;
  ebookTitle: string;
  amount: number;
  paymentId: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  downloadToken: string;
  downloadCount: number;
  maxDownloads: number; // default: 1
  createdAt: string;
  downloadedAt?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // SHA-256
  role: 'superadmin' | 'admin';
  createdAt: string;
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // SHA-256
  purchasedBooks: string[]; // array of ebook IDs
  createdAt: string;
}
