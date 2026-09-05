import React, { useState, useLayoutEffect } from 'react';
import { Navbar, Footer, Portfolio, GraphicDesignOverlay, ServiceModal, ComingSoonOverlay } from './App';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PortfolioPage = ({ isDarkTheme, toggleTheme, currentLogo, currentMsmeLogo, onWhatsAppClick, onAddToCart, cartItemCount }) => {
  const [activeOverlayItem, setActiveOverlayItem] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setActiveOverlayItem(null);
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: isDarkTheme ? '#1C2633' : 'var(--color-bg)',
    color: 'var(--color-text)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={pageStyle}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme} 
        currentLogo={currentLogo} 
        onNavClick={() => { setIsOverlayOpen(false); setActiveOverlayItem(null); }} 
        onToggleConsultation={() => {}}
        cartItemCount={cartItemCount}
      />
      
      {activeOverlayItem === 'Graphic Design' ? (
        <GraphicDesignOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
      ) : activeOverlayItem?.startsWith('service-') ? (
        <ServiceModal isOpen={isOverlayOpen} onClose={closeOverlay} title={activeOverlayItem.replace('service-', '')} onAddToCart={onAddToCart} />
      ) : (
        <ComingSoonOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
      )}

      <main style={{ paddingTop: '120px', paddingBottom: '4rem', position: 'relative', flexGrow: 1 }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            position: 'absolute',
            top: '80px',
            left: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = 'var(--color-surface-light, rgba(0,0,0,0.05))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Go back to main website"
        >
          <ArrowLeft size={28} />
        </button>
        <Portfolio openOverlay={(title) => { setActiveOverlayItem(title); setIsOverlayOpen(true); }} />
      </main>

      <Footer 
        currentLogo={currentLogo} 
        currentMsmeLogo={currentMsmeLogo} 
        onWhatsAppClick={onWhatsAppClick}
      />
    </div>
  );
};

export default PortfolioPage;
