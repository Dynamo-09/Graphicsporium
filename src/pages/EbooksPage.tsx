import React, { useState, useEffect } from 'react';
import { BookOpen, Check, ShieldCheck, Sparkles, Download, FileText, ArrowRight, Eye, Star } from 'lucide-react';
import { EBOOKS_CATALOG } from '../data/ebooks';
import { Ebook } from '../types/ecommerce';
import { YouPICheckoutModal } from '../components/ebooks/YouPICheckoutModal';
import { Footer } from '../App';

interface EbooksPageProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  currentLogo: string;
  currentMsmeLogo: string;
  onWhatsAppClick: (e: any) => void;
}

export const EbooksPage: React.FC<EbooksPageProps> = ({
  isDarkTheme,
  currentLogo,
  currentMsmeLogo,
  onWhatsAppClick,
}) => {
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [previewEbook, setPreviewEbook] = useState<Ebook | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleBuyNow = (ebook: Ebook) => {
    setSelectedEbook(ebook);
    setIsCheckoutOpen(true);
  };

  // Luxury theme design tokens
  const cardBg = isDarkTheme ? '#0f172a' : '#FFFFFF';
  const cardBorder = isDarkTheme ? 'rgba(51, 65, 85, 0.6)' : 'rgba(215, 210, 185, 0.6)';
  const cardShadow = isDarkTheme
    ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 90, 0, 0.05)'
    : '0 20px 45px -15px rgba(20, 17, 64, 0.1), 0 2px 10px rgba(0, 0, 0, 0.03)';
  const textMuted = isDarkTheme ? '#94a3b8' : '#475569';
  const headingColor = isDarkTheme ? '#f8fafc' : '#141140';

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--color-bg)', width: '100%', overflowX: 'hidden' }}
    >
      {/* Main Content Area */}
      <main className="flex-1 w-full" style={{ paddingTop: '160px', paddingBottom: '6rem' }}>
        
        {/* Centered Hero Section */}
        <section className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-[#ff5a00]/40 bg-[#ff5a00]/10 text-[#ff5a00] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={14} className="text-[#ff5a00]" />
            Official Graphicporium E-Book Store
          </div>

          {/* Main Headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] mb-6 mx-auto"
            style={{ color: headingColor, maxWidth: '900px' }}
          >
            Level Up Your Creative &amp; <br />
            <span 
              className="bg-gradient-to-r from-[#ff5a00] via-[#ff7a33] to-[#ff9455] bg-clip-text text-transparent drop-shadow-sm"
            >
              Design Mastery
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-base sm:text-lg md:text-xl font-normal leading-relaxed mx-auto mb-10"
            style={{ color: textMuted, maxWidth: '680px' }}
          >
            Battle-tested frameworks, brand strategy guides, and UX architecture manuals written directly from our studio's commercial client work.
          </p>

          {/* Trust Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold mb-16">
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm backdrop-blur-md transition-transform hover:scale-105"
              style={{ 
                backgroundColor: isDarkTheme ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.95)', 
                color: headingColor,
                border: `1px solid ${cardBorder}`
              }}
            >
              <ShieldCheck size={16} className="text-[#ff5a00]" />
              <span>Personalized License Watermark</span>
            </div>
            
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm backdrop-blur-md transition-transform hover:scale-105"
              style={{ 
                backgroundColor: isDarkTheme ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.95)', 
                color: headingColor,
                border: `1px solid ${cardBorder}`
              }}
            >
              <Download size={16} className="text-[#ff5a00]" />
              <span>Instant 1-Click PDF Download</span>
            </div>

            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm backdrop-blur-md transition-transform hover:scale-105"
              style={{ 
                backgroundColor: isDarkTheme ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.95)', 
                color: headingColor,
                border: `1px solid ${cardBorder}`
              }}
            >
              <BookOpen size={16} className="text-[#ff5a00]" />
              <span>Direct UPI Zero-Fee Checkout</span>
            </div>
          </div>
        </section>

        {/* 100% Symmetrically Centered E-Books Grid */}
        <section 
          className="container"
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            padding: '0 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 380px))',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: '2.5rem',
              width: '100%',
              maxWidth: '1240px',
              margin: '0 auto'
            }}
          >
            {EBOOKS_CATALOG.map((ebook) => (
              <div 
                key={ebook.id}
                className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2.5"
                style={{
                  backgroundColor: cardBg,
                  border: `1.5px solid ${cardBorder}`,
                  boxShadow: cardShadow,
                  width: '100%',
                  margin: '0 auto'
                }}
              >
                {/* Book Cover Container with 3D feel */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-950">
                  <img 
                    src={ebook.coverImage} 
                    alt={ebook.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-3.5 py-1 text-[11px] font-bold rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {ebook.category}
                    </span>
                    {ebook.badge && (
                      <span className="px-3 py-1 text-[11px] font-black rounded-full bg-gradient-to-r from-[#ff5a00] to-[#ff7a33] text-white shadow-lg flex items-center gap-1.5">
                        <Star size={11} fill="white" />
                        {ebook.badge}
                      </span>
                    )}
                  </div>

                  {/* Format & Pages */}
                  <div className="absolute bottom-3.5 left-4 text-white text-xs font-semibold flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                    <FileText size={13} className="text-[#ff5a00]" />
                    <span>{ebook.pages} Pages • {ebook.format}</span>
                  </div>
                </div>

                {/* Book Body */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2 group-hover:text-[#ff5a00] transition-colors leading-snug"
                      style={{ color: headingColor }}
                    >
                      {ebook.title}
                    </h3>
                    
                    {ebook.subtitle && (
                      <p className="text-xs font-bold text-[#ff5a00] mb-3 line-clamp-1 uppercase tracking-wide">
                        {ebook.subtitle}
                      </p>
                    )}

                    <p 
                      className="text-xs sm:text-sm mb-6 leading-relaxed line-clamp-3 font-normal"
                      style={{ color: textMuted }}
                    >
                      {ebook.description}
                    </p>

                    {/* Highlights List */}
                    {ebook.highlights && (
                      <div 
                        className="space-y-2.5 mb-6 pt-4 border-t"
                        style={{ borderColor: cardBorder }}
                      >
                        {ebook.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs font-medium" style={{ color: headingColor }}>
                            <div className="w-4 h-4 rounded-full bg-[#ff5a00]/15 text-[#ff5a00] flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={11} strokeWidth={3} />
                            </div>
                            <span className="leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA & Pricing */}
                  <div 
                    className="pt-5 border-t flex items-center justify-between gap-3 mt-auto"
                    style={{ borderColor: cardBorder }}
                  >
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-[#ff5a00]">₹{ebook.price}</span>
                        {ebook.originalPrice && (
                          <span className="text-xs line-through font-medium" style={{ color: textMuted }}>
                            ₹{ebook.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] block font-semibold uppercase tracking-wider mt-0.5" style={{ color: textMuted }}>
                        One-time • Lifetime access
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewEbook(ebook)}
                        title="Read sample preview"
                        className="px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
                        style={{
                          backgroundColor: isDarkTheme ? '#1e293b' : '#f1f5f9',
                          color: headingColor,
                          border: `1px solid ${cardBorder}`
                        }}
                      >
                        <Eye size={13} className="text-[#ff5a00]" />
                        Sample
                      </button>

                      <button
                        onClick={() => handleBuyNow(ebook)}
                        className="px-5 py-2.5 text-xs font-black rounded-xl bg-gradient-to-r from-[#ff5a00] to-[#ff7a33] hover:from-[#ff6a1a] hover:to-[#ff8a43] text-white shadow-md hover:shadow-xl hover:scale-102 transition-all flex items-center gap-1.5"
                      >
                        Buy Now
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Sample Preview Modal */}
        {previewEbook && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div 
              className="w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative"
              style={{ 
                backgroundColor: cardBg, 
                border: `1.5px solid ${cardBorder}`, 
                color: headingColor,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <h3 className="text-xl font-bold mb-2">
                Sample Preview: <span className="text-[#ff5a00]">{previewEbook.title}</span>
              </h3>

              <p className="text-xs mb-6 font-normal leading-relaxed" style={{ color: textMuted }}>
                Here is an overview of what is included inside this complete {previewEbook.pages}-page edition:
              </p>

              <div 
                className="p-5 rounded-2xl space-y-3 mb-6 text-xs font-medium"
                style={{ 
                  backgroundColor: isDarkTheme ? '#020617' : '#f8fafc',
                  border: `1px solid ${cardBorder}`
                }}
              >
                <div className="font-bold text-[#ff5a00] uppercase tracking-wider text-[11px]">
                  Table of Contents &amp; Modules
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]"></span>
                  <span>Module 01: Core Foundations, Grid Systems &amp; Visual Balance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]"></span>
                  <span>Module 02: Commercial Case Studies &amp; High-Ticket Blueprints</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]"></span>
                  <span>Module 03: Templates, Checklists &amp; Studio Delivery Worksheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]"></span>
                  <span>Module 04: Client Handoff, Licensing &amp; Value-Based Pricing</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  onClick={() => setPreviewEbook(null)}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl hover:opacity-80 transition"
                  style={{ color: textMuted }}
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    const b = previewEbook;
                    setPreviewEbook(null);
                    handleBuyNow(b);
                  }}
                  className="px-5 py-2.5 text-xs font-black rounded-xl bg-gradient-to-r from-[#ff5a00] to-[#ff7a33] text-white shadow-md transition"
                >
                  Get Full Copy (₹{previewEbook.price})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* YouPI Checkout Modal with Luxury Adaptive Styling */}
        <YouPICheckoutModal
          ebook={selectedEbook}
          isOpen={isCheckoutOpen}
          isDarkTheme={isDarkTheme}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </main>

      {/* Website Footer */}
      <Footer 
        currentLogo={currentLogo} 
        currentMsmeLogo={currentMsmeLogo} 
        onWhatsAppClick={onWhatsAppClick} 
      />
    </div>
  );
};
