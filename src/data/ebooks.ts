import { Ebook } from '../types/ecommerce';

/**
 * Centralized Code-Managed E-Book Catalog
 * 
 * To add a new e-book:
 * 1. Place the cover image in `public/ebooks/covers/` (or `src/assets/`)
 * 2. Place the raw PDF file in `public/ebooks/files/`
 * 3. Add an entry to this array below.
 */
export const EBOOKS_CATALOG: Ebook[] = [
  {
    id: 'branding-identity-mastery',
    title: 'Brand Identity Mastery 2026',
    subtitle: 'The Complete Blueprint from Concept to High-Ticket Visual Identity',
    description: 'Learn the exact frameworks used by top design studios to craft timeless brand identities, color palettes, and typography systems that command premium rates.',
    price: 499,
    originalPrice: 999,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    pdfFilePath: '/ebooks/sample.pdf',
    pages: 148,
    format: 'PDF',
    category: 'Branding & Design',
    badge: 'Bestseller',
    highlights: [
      'Comprehensive Brand Strategy Framework',
      'Color Psychology & Font Pairing Rules',
      'Client Presentation & Case Study Decks',
      'Real Studio Contract & Proposal Templates'
    ]
  },
  {
    id: 'web-design-architecture-playbook',
    title: 'Modern Web Design & UX Playbook',
    subtitle: 'Transform Complex Business Goals into High-Converting Digital Experiences',
    description: 'A practical, zero-fluff manual on grid systems, visual hierarchy, mobile responsiveness, and design-to-development handoff for freelance and agency designers.',
    price: 399,
    originalPrice: 799,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    pdfFilePath: '/ebooks/sample.pdf',
    pages: 124,
    format: 'PDF',
    category: 'Web Development & UX',
    badge: 'New Launch',
    highlights: [
      'Responsive Grid Mastery (Mobile, Tablet, Desktop)',
      'Modern Micro-interactions & Animation Curves',
      'High-Conversion Hero Section Formulas',
      'Figma to Production Workflow Secrets'
    ]
  },
  {
    id: 'freelance-design-agency-growth',
    title: 'The 6-Figure Creative Agency Blueprint',
    subtitle: 'Scale from Solo Freelancer to a Thriving Creative Studio',
    description: 'Master inbound client acquisition, cold outreach scripts, value-based pricing, and project management systems without burnout.',
    price: 599,
    originalPrice: 1299,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    pdfFilePath: '/ebooks/sample.pdf',
    pages: 180,
    format: 'PDF',
    category: 'Business & Freelancing',
    badge: 'Must Read',
    highlights: [
      'Value-Based Pricing Math & Rate Calculator',
      'Inbound Lead Magnets & Social Media Engine',
      'Standard Operating Procedures (SOPs)',
      'Closing High-Ticket \$3,000+ Deals'
    ]
  }
];
