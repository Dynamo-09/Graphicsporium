import React, { useState, useLayoutEffect } from 'react';
import { Navbar, Footer, services, ServiceModal, ComingSoonOverlay, GraphicDesignOverlay } from './App';
import { ArrowRight } from 'lucide-react';

const ServicesPage = ({ isDarkTheme, toggleTheme, currentLogo, currentMsmeLogo, onWhatsAppClick }) => {
  const [activeOverlayItem, setActiveOverlayItem] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [estimatorData, setEstimatorData] = useState([]);

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  const handleAddToCart = (item) => {
    setEstimatorData(prev => [...prev, item]);
  };

  const handleServiceClick = (e, service) => {
    e.preventDefault();
    if (service.isComingSoon) {
      setActiveOverlayItem(service.title);
      setIsOverlayOpen(true);
    } else {
      setActiveOverlayItem(`service-${service.title}`);
      setIsOverlayOpen(true);
    }
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setActiveOverlayItem(null);
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: isDarkTheme ? '#1C2633' : 'var(--color-bg)',
    color: 'var(--color-text)',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };

  return (
    <div style={pageStyle}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme} 
        currentLogo={currentLogo} 
        onNavClick={() => { setIsOverlayOpen(false); setActiveOverlayItem(null); }} 
        onToggleConsultation={() => {}}
      />
      
      {activeOverlayItem === 'Graphic Design' ? (
        <GraphicDesignOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
      ) : activeOverlayItem?.startsWith('service-') ? (
        <ServiceModal isOpen={isOverlayOpen} onClose={closeOverlay} title={activeOverlayItem.replace('service-', '')} onAddToCart={handleAddToCart} />
      ) : (
        <ComingSoonOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
      )}

      <main style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
        <section className="section">
          <div className="container">
            <h2 className="section-title text-center" style={{ marginBottom: '1rem' }}>All <span>Services</span></h2>
            <p className="section-subtitle text-center" style={{ marginBottom: '4rem' }}>
              Explore our full range of design and development solutions.
            </p>
            
            <div className="services-grid">
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="service-card glass animate-fade-in" 
                  style={{ position: 'relative', animationDelay: `${(idx % 6) * 0.1}s`, cursor: 'pointer' }}
                  onClick={(e) => handleServiceClick(e, service)}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <a
                    href="#"
                    className="service-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    View Details <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer currentLogo={currentLogo} currentMsmeLogo={currentMsmeLogo} onWhatsAppClick={onWhatsAppClick} />
    </div>
  );
};

export default ServicesPage;
