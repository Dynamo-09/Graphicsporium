import { useState, useEffect, useRef, Fragment } from 'react';
import {
  Menu, X, ArrowRight, ArrowLeft, PenTool, Layout, Box,
  Monitor, CheckCircle,
  Quote,
  Image, Package, Shirt, BookOpen, Flag, CreditCard,
  FileText, MonitorPlay, Share2, Wand2, Video,
  Film, TrendingUp, Star, Sun, Moon
} from 'lucide-react';
import './index.css';

import logoDarkThemeImg from './assets/Graphicsporium_page_1black_trans.png';
import logoLightThemeImg from './assets/Graphicsporium_page_1white_trans.png';
import msmeDarkThemeImg from './assets/MSME_logo_black_trans.png';
import msmeLightThemeImg from './assets/MSME_logo_white_trans.png';
import bikiBw from './assets/BikiPrasad_B&W.png';
import bikiColor from './assets/BikiPrasad_color.png';
import bishalBw from './assets/BishalPrajapati_B&W.png';
import bishalColor from './assets/BishalPrajapati_color.png';
import pratyayBw from './assets/PratyayBanerjee_B&W.png';
import pratyayColor from './assets/PratyayBanerjee_color.png';
import priyanshuBw from './assets/PriyanshuChoudhuri_B&W.jpeg';
import priyanshuColor from './assets/PriyanshuChoudhuri_color.jpeg';
import sayanBw from './assets/SayanBiswas_B&W.jpeg';
import sayanColor from './assets/SayanBiswas_color.jpeg';
import snehaBw from './assets/sneha_B&W.png';
import snehaColor from './assets/sneha_color.png';

import imgBanner from './assets/our services images/Banner.png';
import imgBranding from './assets/our services images/Branding Design.png';
import imgBusinessCards from './assets/our services images/Business cards.png';
import imgDigitalMarketing from './assets/our services images/Digital Marketing.png';
import imgFlyers from './assets/our services images/Flyers.png';
import imgIllustration from './assets/our services images/Illustration.png';
import imgLogo from './assets/our services images/Logo.png';
import imgPackage from './assets/our services images/Package.png';
import imgSocialMedia from './assets/our services images/Social media post.png';
import imgTshirts from './assets/our services images/T shirts.png';
import imgUI from './assets/our services images/UI.png';
import imgWebApp from './assets/our services images/Web_App Dev.png';
import clientLogo1 from './assets/for web/Group 37025.png';
import clientLogo2 from './assets/for web/Group 37026.png';
import clientLogo3 from './assets/for web/Group 37027.png';
import clientLogo4 from './assets/for web/Group 37028.png';
import clientLogo5 from './assets/for web/Group 37029.png';
import clientLogo6 from './assets/for web/Group 37030.png';
import clientLogo7 from './assets/for web/Group 37031.png';
import clientLogo8 from './assets/for web/Group 37042.png';
import clientLogo9 from './assets/for web/Group 37044.png';
import gLogoImg from './assets/G_LOGO.png';

// --- Navigation ---
const Navbar = ({ isDarkTheme, toggleTheme, currentLogo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo">
          <img src={currentLogo} alt="Graphicsporium" className="navbar-logo" style={{
            height: '65px',
            width: '240px',
            objectFit: 'contain',
            objectPosition: 'left center'
          }} />
        </a>

        <ul className="nav-links desktop-only">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
        </ul>

        <div className="nav-actions desktop-only">
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
          <div className="theme-toggle-container">
            <Moon size={20} stroke="#FF5A00" />
            <button className={`theme-toggle-btn ${!isDarkTheme ? 'active-light' : ''}`} onClick={toggleTheme}>
              <div className="theme-toggle-circle"></div>
            </button>
            <Sun size={20} stroke="#FF5A00" />
          </div>
        </div>

        <div className="mobile-toggle-wrapper mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="theme-toggle-container">
            <Moon size={18} stroke="#FF5A00" />
            <button className={`theme-toggle-btn ${!isDarkTheme ? 'active-light' : ''}`} onClick={toggleTheme}>
              <div className="theme-toggle-circle"></div>
            </button>
            <Sun size={18} stroke="#FF5A00" />
          </div>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'block' }}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass">
          <ul>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
            <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
            <li><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a></li>
            <li><a href="#contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Let's Talk</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = ({ currentLogo }) => {
  const [time, setTime] = useState(new Date());
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const phrases = [
    'Bringing Your Vision To Life, Pixel By Pixel',
    'Where Creativity Meets Precision',
    'Designs That Make First Impressions Last',
    'Your Brand. Our Obsession.'
  ];
  
  useEffect(() => {
    let pi = 0, ci = 0, del = false;
    let timeoutId;
    
    const typeLoop = () => {
      const phrase = phrases[pi];
      if (!del) {
        setTypedText(phrase.slice(0, ci + 1));
        ci++;
        if (ci === phrase.length) {
          del = true;
          timeoutId = setTimeout(typeLoop, 2200);
          return;
        }
      } else {
        setTypedText(phrase.slice(0, ci - 1));
        ci--;
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      timeoutId = setTimeout(typeLoop, del ? 28 : 55);
    };
    
    timeoutId = setTimeout(typeLoop, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  const shapeData = [
    {type:'diamond', top:'12%', left:'8%', size:12, delay:0.8, dur:4.5},
    {type:'diamond', top:'75%', left:'6%', size:9, delay:1.2, dur:5.5},
    {type:'diamond', top:'35%', left:'88%', size:14, delay:0.5, dur:4},
    {type:'diamond', top:'68%', left:'91%', size:10, delay:1.8, dur:6},
    {type:'diamond', top:'45%', left:'4%', size:7, delay:2.2, dur:5},
    {type:'circle', top:'30%', left:'14%', size:22, delay:1, dur:5.5},
    {type:'circle', top:'60%', left:'82%', size:18, delay:1.5, dur:4.8},
    {type:'circle', top:'85%', left:'40%', size:14, delay:2.5, dur:6.2},
    {type:'line', top:'18%', left:'60%', width:70, delay:2, dur:3.5},
    {type:'line', top:'82%', left:'20%', width:50, delay:2.8, dur:4.2},
    {type:'line', top:'50%', left:'78%', width:45, delay:1.6, dur:3.8}
  ];

  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');

  return (
    <header id="home" className="hero-new-banner banner">
      <div className="grid-lines"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      
      <div className="floating-shapes" id="floatingShapes">
        {shapeData.map((s, idx) => (
          <div key={idx} 
               className={`shape ${s.type === 'diamond' ? 'shape-diamond' : s.type === 'circle' ? 'shape-circle' : 'shape-line'}`}
               style={{
                 top: s.top, 
                 left: s.left, 
                 animationDelay: `${s.delay}s`,
                 width: s.type === 'diamond' || s.type === 'circle' ? s.size : s.width,
                 height: s.type === 'diamond' || s.type === 'circle' ? s.size : undefined,
                 animationDuration: `${s.dur}s`
               }}
          />
        ))}
      </div>
      
      <div className="noise-overlay"></div>
      <div className="scan-line"></div>
      <div className="pixel-cursor"></div>
      
      <div className="corner-accent ca-tl"></div>
      <div className="corner-accent ca-tr"></div>
      <div className="corner-accent ca-bl"></div>
      <div className="corner-accent ca-br"></div>
      
      <div className="gp-live-clock" id="gpLiveClock">
        <span className="gp-clock-time" id="gpClockTime">{`${hh}:${mm}:${ss}`}</span>
        <span className="gp-clock-sep">&middot;</span>
        <span className="gp-live-dot"></span>
        <span className="gp-live-text">LIVE</span>
      </div>

      <div className="gp-content">
        <div className="gp-logo-area">
          <h1 className="gp-logo-g" style={{ margin: 0 }}>
            <span className="char-g">Graphics</span><span className="char-p">porium</span>
          </h1>
          <div className="gp-wordmark">
            <span>Creative</span>
            <span>&middot;</span>
            <span>Design</span>
            <span>&middot;</span>
            <span>Branding</span>
          </div>
        </div>

        <div className="gp-tagline">
          <div className="gp-typewriter"><span id="gpTyped">{typedText}</span><span className="gp-cursor"></span></div>
        </div>

        <div className="gp-services">
          <span className="gp-pill">Brand Identity</span>
          <span className="gp-pill">UI/UX Design</span>
          <span className="gp-pill">Motion Graphics</span>
          <span className="gp-pill">Print Design</span>
          <span className="gp-pill">Web Design</span>
        </div>

        <div className="gp-cta-row">
          <a href="#portfolio" className="gp-btn-main">View Our Portfolio</a>
          <a href="#contact" className="gp-btn-out">Start a Project &rarr;</a>
        </div>
      </div>
    </header>
  );
};

// --- Services Section ---
const services = [
  { icon: <Image size={32} />, title: "Logo Design", desc: "Memorable logos that perfectly capture your brand identity.", price: "₹1499*" },
  { icon: <Box size={32} />, title: "Branding Design", desc: "Cohesive brand identities that stand out in the crowded market.", price: "₹2,499*" },
  { icon: <CreditCard size={32} />, title: "Business Card Design", desc: "Professional business cards that leave a lasting impression.", price: "₹99*" },
  { icon: <FileText size={32} />, title: "Flyer/Leaflet Design", desc: "Engaging promotional materials for your marketing campaigns.", price: "₹199*" },
  { icon: <Share2 size={32} />, title: "Social Media Post Design", desc: "Scroll-stopping social media graphics to boost engagement.", price: "₹149*" },
  { icon: <Flag size={32} />, title: "Banner Design", desc: "High-impact banners for digital and physical advertising.", price: "₹249*" },
  { icon: <Shirt size={32} />, title: "T-Shirt Design", desc: "Custom apparel designs that people actually want to wear.", price: "₹349*" },
  { icon: <Package size={32} />, title: "Packaging Design", desc: "Eye-catching packaging that protects and promotes your products.", price: "₹899*" },
  { icon: <PenTool size={32} />, title: "Illustration", desc: "Custom, hand-crafted illustrations that tell your brand's unique story.", price: "₹399*" },
  { icon: <Film size={32} />, title: "Motion Graphics", desc: "Dynamic animations that bring your visual identity to life.", isComingSoon: true },
  { icon: <Video size={32} />, title: "Video Editing", desc: "Professional video editing services.", isComingSoon: true },
  { icon: <Film size={32} />, title: "2D/3D Animation", desc: "Engaging animations to bring your ideas to life.", isComingSoon: true },
  { icon: <Box size={32} />, title: "3D Modeling", desc: "High-quality 3D models for various applications.", isComingSoon: true },
  { icon: <Layout size={32} />, title: "UI/UX Design", desc: "Intuitive and beautiful interfaces that users love to interact with.", price: "₹3,499*" },
  { icon: <Monitor size={32} />, title: "Website/App Development", desc: "Responsive websites and high-performance mobile applications.", price: "₹4,999*" },
  { icon: <TrendingUp size={32} />, title: "Digital Marketing", desc: "Data-driven marketing strategies to grow your audience.", price: "₹2,499*/month" },
];

const CountUp = ({ end, duration = 2000, suffix = "", start = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration, start]);

  return <>{count}{suffix}</>;
};

const StatusBar = () => {
  const stats = [
    { label: "Project Completed", value: 100, suffix: " +" },
    { label: "Clients", value: 35, suffix: "+" },
    { label: "Experience Years", value: 4, suffix: "" },
    { label: "Team Size", value: 10, suffix: "+" },
    { label: "Client Retention", value: 85, suffix: "%" },
    { label: "Reviews", value: 5, suffix: "", isStar: true },
  ];

  const companies = [clientLogo1, clientLogo2, clientLogo3, clientLogo4, clientLogo5, clientLogo6, clientLogo7, clientLogo8, clientLogo9];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="status-bar-section section bg-surface-light">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item glass">
              <h3>
                <CountUp end={stat.value} suffix={stat.suffix} start={isVisible} />
                {stat.isStar && (
                  <span className="stars">
                    <Star size={20} fill="#FF5A00" color="#FF5A00" />
                  </span>
                )}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="marquee-container mt-12">
          <div className="marquee">
            {[1, 2].map((group) => (
              <div key={group} className="marquee-group">
                {companies.map((logo, idx) => (
                  <span key={idx} className="company-logo">
                    <img src={logo} alt={`Client Logo ${idx + 1}`} className="client-logo-img" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ openOverlay }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 6);

  const handleServiceClick = (e, service) => {
    e.preventDefault();
    if (service.isComingSoon) {
      openOverlay(service.title);
    } else {
      openOverlay(`service-${service.title}`);
    }
  };

  return (
    <section id="services" className="section bg-surface" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">Our <span>Services</span></h2>
        <p className="section-subtitle">Comprehensive design and development solutions tailored to elevate your business.</p>

        <div className="services-grid">
          {displayedServices.map((service, idx) => (
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

        {!showAll ? (
          <div className="text-center animate-fade-in" style={{ clear: 'both', paddingTop: '4rem' }}>
            <button className="btn btn-outline" onClick={() => setShowAll(true)}>
              Explore More Services <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="text-center animate-fade-in" style={{ clear: 'both', paddingTop: '4rem' }}>
            <button className="btn btn-outline" onClick={() => setShowAll(false)}>
              Show Less Services <ArrowRight size={20} style={{ transform: 'rotate(-180deg)' }} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Website & Branding Packages Section ---
const WebsiteAndBrandingPackages = ({ onAddToCart }) => {
  const handleGetQuote = (pkg) => {
    onAddToCart({
      designType: pkg.title,
      websiteType: pkg.title.includes('Website') || pkg.title.includes('Startup') || pkg.title.includes('Enterprise') ? 'Package' : '',
      price: pkg.price !== 'Custom' ? pkg.price : 'Custom Quotation',
      timeline: 'Standard Delivery'
    });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const packages = [
    {
      title: "Startup Package",
      subtitle: "Perfect for startups and new businesses looking to establish a professional online presence.",
      includes: [
        "Custom Logo Design",
        "Complete Brand Identity Kit",
        "Static or Dynamic Website Development",
        "Includes free on-page SEO setup",
        "Web Hosting Included",
        "Capacity for up to 1,00,000 Monthly Visitors",
        "3 Months Free Technical Support"
      ],
      notIncluded: "Domain Registration: Not Included",
      maintenance: "Maintenance: ₹2,699/month after the initial 3-month support period.",
      price: "₹13,999"
    },
    {
      title: "Small Business",
      subPackages: [
        {
          title: "Design Package",
          subtitle: "Essential design solutions to elevate your small business branding.",
          includes: [
            "Custom Logo Design",
            "Business Card Design",
            "Brand Identity Kit",
            "Flyer Design"
          ],
          price: "₹2,999",
          fullTitle: "Small Business – Design Package"
        },
        {
          title: "Website Package",
          subtitle: "Affordable and professional web presence for your growing business.",
          includes: [
            "Static Website (5+ Pages)",
            "Includes free on-page SEO setup",
            "Web Hosting Included",
            "3 Months Free Support"
          ],
          notIncluded: "Domain Registration: Not Included",
          maintenance: "Maintenance: ₹1,899/month after the initial support period.",
          price: "₹4,999",
          fullTitle: "Small Business – Website Package"
        }
      ]
    },
    {
      title: "Enterprise Package",
      subtitle: "Customized solutions designed according to business requirements.",
      includes: [
        "Custom Logo Design",
        "Complete Brand Identity Kit",
        "Dynamic or E-Commerce Website Development",
        "Cloud Hosting Support",
        "Includes free on-page SEO setup",
        "6 Months Free Technical Support"
      ],
      maintenance: "Maintenance: Customizable plans starting at ₹5,499/month after the initial 6-month support period",
      pricingNote: "Pricing: Custom quotation based on project requirements.",
      price: "Custom"
    }
  ];

  const renderPackageContent = (pkg, isSubPackage = false) => (
    <>
      {isSubPackage ? (
        <h4 style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{pkg.title}</h4>
      ) : (
        <h3 style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>{pkg.title}</h3>
      )}
      {pkg.subtitle && <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>{pkg.subtitle}</p>}
      
      <div style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
        {pkg.includes && (
          <>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--color-text)', fontSize: '1rem' }}>Includes:</h5>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '1.5rem' }}>
              {pkg.includes.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', color: 'var(--color-text)' }}>
                  <span style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        
        {pkg.notIncluded && <p style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}><strong>{pkg.notIncluded}</strong></p>}
        {pkg.maintenance && <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}><em>{pkg.maintenance}</em></p>}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', textAlign: 'center' }}>
        {pkg.price && pkg.price !== 'Custom' ? (
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-text)' }}>
            Package Starts From: <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginLeft: '0.5rem' }}>{pkg.price}<sup>*</sup></span>
          </p>
        ) : pkg.pricingNote ? (
          <p style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-text)' }}>{pkg.pricingNote}</p>
        ) : null}
        
        <button onClick={() => handleGetQuote({ title: pkg.fullTitle || pkg.title, price: pkg.price })} className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }}>Get Quote</button>
      </div>
    </>
  );

  return (
    <section id="packages" className="section bg-surface-light" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">
            Website & Branding <span>Packages</span>
          </h2>
          <p className="section-subtitle">Comprehensive solutions tailored to launch and grow your brand's digital presence.</p>
        </div>
        
        <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {packages.map((pkg, idx) => (
            <div key={idx} className="service-card glass animate-fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', animationDelay: `${idx * 0.1}s`, cursor: 'default' }}>
              {pkg.subPackages ? (
                <>
                  <h3 style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>{pkg.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flexGrow: 1 }}>
                    {pkg.subPackages.map((subPkg, subIdx) => (
                      <div key={subIdx} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        {renderPackageContent(subPkg, true)}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                renderPackageContent(pkg, false)
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- About Us Section ---
const AboutUs = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container about-container">
        <div className="about-image">
          <img src="/about_bg_1778656659879.png" alt="About Us" className="rounded-image" />
          <div className="experience-badge glass">
            <h3>4</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Years of Excellence</p>
          </div>
        </div>

        <div className="about-content">
          <h2 className="section-title text-left">Why Choose <span>Us</span></h2>
          <p className="about-description">
            At Graphicsporium, we believe in the power of design to transform businesses. Our team of passionate creatives and technologists work relentlessly to push boundaries and deliver exceptional results.
          </p>

          <ul className="about-features">
            <li>
              <CheckCircle className="feature-icon" />
              <div>
                <h4>Creative Excellence</h4>
                <p>Award-winning designs that captivate and engage.</p>
              </div>
            </li>
            <li>
              <CheckCircle className="feature-icon" />
              <div>
                <h4>Fast Delivery</h4>
                <p>Streamlined processes to meet your deadlines without compromising quality.</p>
              </div>
            </li>
            <li>
              <CheckCircle className="feature-icon" />
              <div>
                <h4>Client Focus</h4>
                <p>Your success is our priority. We partner with you every step of the way.</p>
              </div>
            </li>
          </ul>

          <a href="#contact" className="btn btn-primary mt-8">Start Your Project</a>
        </div>
      </div>
    </section>
  );
};

// --- Portfolio Section ---
const portfolioItems = [
  { title: "Graphic Design" },
  { title: "Package Design" },
  { title: "T-Shirt Design" },
  { title: "Illustration", isComingSoon: true },
  { title: "Video Editing", isComingSoon: true },
  { title: "2D/3D Animation", isComingSoon: true },
  { title: "3D Modeling", isComingSoon: true },
  { title: "Website/App Development" },
];

const Portfolio = ({ openOverlay }) => {
  const handlePortfolioClick = (e, title) => {
    e.preventDefault();
    openOverlay(title);
  };

  return (
    <section id="portfolio" className="section bg-surface" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="section-title">Our <span>Portfolio</span></h2>
        <p className="section-subtitle">A glimpse into our recent successful projects and creative endeavors.</p>

        <div className="new-portfolio-grid">
          {portfolioItems.map((item, idx) => (
            <div 
              key={idx} 
              className="new-portfolio-card animate-fade-in" 
              style={{ animationDelay: `${(idx % 9) * 0.1}s`, cursor: 'pointer' }}
              onClick={(e) => handlePortfolioClick(e, item.title)}
            >
              <h3>{item.title}</h3>
              <a
                href="#"
                className="portfolio-explore-link"
                onClick={(e) => e.preventDefault()}
              >
                Explore <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const testimonials = [
  { name: "MAYUKH BHATTACHARYYA", role: "Customer", quote: "Outstanding designer with excellent service...I ordered for the design and print and they delivered it in 1 day....Never seen this kind of service before....so 100*** from my side and the owner is himself a gentleman..." },
  { name: "Asaph Zoheth Alva", role: "Customer", quote: "The Service was very good and they we're really sincere in their work even better than what i was actually expecting. They got my job done even before the expected time. Truly appreciate the efforts" },
  { name: "champavat krushnarajsinh", role: "Customer", quote: "GRAPHICSPORIUM is consistently exceeded our expectations with their creative and professional graphic design services, delivering visually stunning branding materials that perfectly captured our company's identity while staying true to our vision." }
];

const Testimonials = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Client <span>Reviews</span></h2>
        <p className="section-subtitle">Don't just take our word for it. Here's what our clients have to say.</p>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <div key={idx} className="testimonial-card glass">
              <Quote size={40} className="quote-icon" />
              <p className="quote-text">"{test.quote}"</p>
              <div className="client-info">
                <div className="client-avatar">{test.name.charAt(0)}</div>
                <div>
                  <h4>{test.name}</h4>
                  <p>{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = ({ externalData, onRemoveService, onClearServices }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', contactNo: '', email: '', city: '',
    selectedServices: [], message: ''
  });
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (externalData && Array.isArray(externalData)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({
        ...prev,
        selectedServices: externalData
      }));
      setErrors({});
      if (externalData.length > 1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsServicesExpanded(true);
      }
    }
  }, [externalData]);

  const wordCount = formData.message.trim() ? formData.message.trim().split(/\s+/).length : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
      alert('Email must be a valid @gmail.com address');
      return;
    }
    if (formData.contactNo.length !== 10) {
      alert('mobile number should be of 10 digits');
      return;
    }
    if (wordCount > 500) {
      alert('Message exceeds 500 words limit.');
      return;
    }
    if (errors.price) {
      alert('Please follow the range for the price before submitting.');
      return;
    }
    setIsSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim());
      formDataObj.append('email', formData.email);
      const servicesString = formData.selectedServices.map(s => `${s.title || s.designType} (${s.price})`).join(', ');
      formDataObj.append('message', `Contact No: ${formData.contactNo}\nCity: ${formData.city}\nServices: ${servicesString}\n\nMessage:\n${formData.message}`);
      
      if (selectedFile) {
        formDataObj.append('attachment', selectedFile);
      }

      // Automatically use localhost:5000 during local testing, and Vercel's /api endpoint in production
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/send-email'
        : '/api/send-email';

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataObj
      });

      const data = await response.json();

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ firstName: '', middleName: '', lastName: '', contactNo: '', email: '', city: '', selectedServices: [], message: '' });
        setSelectedFile(null);
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (err) {
      console.error("Backend Error:", err);
      alert('An error occurred: ' + err.message);
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section bg-surface-light">
      <div className="container">
        <h2 className="section-title">Share Your <span>Idea With Us</span></h2>
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form-extended glass">
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input value={formData.middleName} onChange={e => setFormData({...formData, middleName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact No *</label>
              <input required value={formData.contactNo} onChange={e => setFormData({...formData, contactNo: e.target.value.replace(/\D/g, '')})} />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
            </div>
          </div>
          <div className="form-group full-width" style={{ marginTop: '1rem', padding: '1.2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
              <span style={{ fontSize: '1.1rem', color: 'var(--color-primary)', cursor: formData.selectedServices.length > 1 ? 'pointer' : 'default' }} onClick={() => formData.selectedServices.length > 1 && setIsServicesExpanded(!isServicesExpanded)}>
                Selected Services ({formData.selectedServices.length})
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {formData.selectedServices.length > 0 && (
                  <span 
                    style={{ fontSize: '0.9rem', color: '#ff4d4d', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={(e) => { e.stopPropagation(); onClearServices && onClearServices(); }}
                  >
                    Clear All
                  </span>
                )}
                {formData.selectedServices.length > 1 && (
                  <span 
                    onClick={() => setIsServicesExpanded(!isServicesExpanded)} 
                    style={{ transition: 'transform 0.3s', transform: isServicesExpanded ? 'rotate(180deg)' : 'rotate(0deg)', cursor: 'pointer' }}
                  >
                    ▼
                  </span>
                )}
              </div>
            </div>
            
            {formData.selectedServices.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>No services selected. Use "Get Quote" to add services.</p>
            ) : formData.selectedServices.length === 1 ? (
              <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ flex: 1 }}><strong>{formData.selectedServices[0].title || formData.selectedServices[0].designType}</strong></span>
                <span style={{ flex: 1, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Standard Delivery</span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>{formData.selectedServices[0].price}</span>
                  <span style={{ color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }} onClick={() => onRemoveService && onRemoveService(0)} title="Remove item">×</span>
                </div>
              </div>
            ) : isServicesExpanded ? (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'gpFadeUp 0.3s ease-out forwards' }}>
                {formData.selectedServices.map((srv, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    <span style={{ flex: 1 }}>{srv.title || srv.designType}</span>
                    <span style={{ flex: 1, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Standard Delivery</span>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--color-primary)' }}>{srv.price}</span>
                      <span style={{ color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: 1 }} onClick={() => onRemoveService && onRemoveService(idx)} title="Remove item">×</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>Click to view all {formData.selectedServices.length} items.</p>
              </div>
            )}
          </div>
          <div className="form-group full-width" style={{ marginTop: '1rem' }}>
            <label>Own Message (max 500 words)</label>
            <textarea 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})} 
              rows={6}
            />
            <div className="word-count" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>
              {wordCount}/500 words
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
            <input type="file" name="attachment" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" id="file-upload" style={{ display: 'none' }} onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button type="button" onClick={() => document.getElementById('file-upload').click()} className="calc-submit-btn" style={{ background: 'transparent', border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}>
              Choose your idea
            </button>
            {selectedFile && <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{selectedFile.name}</span>}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              type="submit" 
              disabled={isSubmitting || formData.selectedServices.length === 0} 
              className="calc-submit-btn"
              title={formData.selectedServices.length === 0 ? "Please select a package using 'Get Quote' to fill this form." : ""}
            >
              {formData.selectedServices.length === 0 ? 'Select a Package First' : (isSubmitting ? 'Sending...' : 'Submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = ({ currentLogo, currentMsmeLogo, onWhatsAppClick }) => {
  return (
    <footer className="footer new-footer">
      <div className="container">
        <div className="new-footer-grid">
          <div className="footer-col">
            <img src={currentLogo} alt="Graphicsporium" className="navbar-logo" style={{ 
              height: '65px', 
              width: '240px',
              objectFit: 'contain',
              objectPosition: 'left center',
              marginBottom: '1rem'
            }} />
            <p className="footer-desc-text">
              We create impactful visual identities and marketing creatives that help brands grow, connect, and stand out in competitive markets.
            </p>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><a href="#services">Logo & Branding</a></li>
              <li><a href="#services">Package Design</a></li>
              <li><a href="#services">UI / UX Design</a></li>
              <li><a href="#services">Website Design</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#blogs">Blogs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><a href="tel:+917044495506">Phone No. +91 70444 95506</a></li>
              <li><a href="mailto:graphicsprioum01@gmail.com">Email Id : graphicsprioum01@gmail.com</a></li>
              <li><a className="contact-link" href="#" onClick={onWhatsAppClick}>WhatsApp Direct</a></li>
            </ul>
          </div>

          <div className="footer-col msme-col">
            <div className="msme-container">
              <img src={currentMsmeLogo} alt="MSME Logo" className="msme-logo-img" />
              <p className="msme-number-text">UDYAM-WB-07-0072277</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Our Team Section ---
const teamMembers = [
  {
    name: "Biki Prasad",
    role: "Sports And Graphics Designer",
    imageBw: bikiBw,
    imageColor: bikiColor,
    linkedin: "https://www.linkedin.com/in/biki-prasad-372b0b371/"
  },
  {
    name: "Bishal Prajapati",
    role: "CEO and Founder\nCreative Designer",
    imageBw: bishalBw,
    imageColor: bishalColor,
    linkedin: "https://www.linkedin.com/in/bishal-prajapati-ab7340245/"
  },
  {
    name: "Sayan Biswas",
    role: "Creative Designer",
    imageBw: sayanBw,
    imageColor: sayanColor,
    linkedin: "https://www.linkedin.com/in/sayan-biswas-75715b325/"
  },
  {
    name: "Pratyay Banerjee",
    role: "Data Analyst\nFull Stack Developer",
    imageBw: pratyayBw,
    imageColor: pratyayColor,
    linkedin: "https://www.linkedin.com/in/pratyay-banerjee-7b6b38292/"
  },
  {
    name: "Sneha Ingle",
    role: "Sales And Marketing Intern",
    imageBw: snehaBw,
    imageColor: snehaColor
  }
];

const OurTeam = ({ isDarkTheme }) => {
  return (
    <section id="team" className="section bg-surface" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="team-header text-center animate-fade-in">
          <h2 className="section-title">Our <span>Creative</span> Team</h2>
          <p className="section-subtitle">Where creativity meets innovation, and ideas turn into reality</p>
        </div>
        
        <div className="team-grid-container">
          <div className="team-grid mt-8">
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div 
                key={idx} 
                className="team-card glass animate-fade-in" 
                style={{ animationDelay: `${(idx % teamMembers.length) * 0.2}s`, cursor: member.linkedin ? 'pointer' : 'default', minWidth: '250px' }}
                onClick={() => member.linkedin ? window.open(member.linkedin, '_blank') : null}
              >
              <div className="team-image-frame">
                <img 
                  src={isDarkTheme ? member.imageBw : member.imageColor} 
                  alt={member.name} 
                  className="team-img"
                />
              </div>
              <div className="team-info">
                <div className="team-details">
                  <h3>{member.name}</h3>
                  <p>
                    {member.role.split('\n').map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        {i < member.role.split('\n').length - 1 && <br />}
                      </Fragment>
                    ))}
                  </p>
                </div>
                <button className="team-arrow-btn">
                  <ArrowRight size={16} style={{ transform: 'rotate(-45deg)' }} />
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Overlays ---
const ServiceModal = ({ isOpen, onClose, title, onAddToCart }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 280);
  };

  if (!isOpen && !isClosing) return null;

  const serviceDescriptions = {
    "Logo Design": "Your logo is the cornerstone of your brand. Our expert designers create memorable, versatile logos that perfectly encapsulate your brand's core values. We focus on creating a unique visual identity that immediately resonates with your target audience and leaves a lasting impression.",
    "Branding Design": "A strong brand goes far beyond just a logo. We develop comprehensive brand identities that establish a cohesive visual language for your business. From color palettes to typography and brand voice, we ensure your brand communicates professionalism and builds trust across every touchpoint.",
    "Business Card Design": "Make your first physical interaction with potential clients unforgettable. Our sleek, professional business card designs are crafted to align perfectly with your brand identity. We balance essential contact information with creative visual elements that ensure your card stands out.",
    "Flyer/Leaflet Design": "Whether for a local promotion, an event, or a product launch, our flyers are designed to grab attention immediately. We combine compelling copy with striking visuals to create marketing materials that drive action and communicate your message quickly and effectively.",
    "Social Media Post Design": "In today's fast-scrolling digital world, your content needs to pop. We design highly engaging, scroll-stopping social media graphics tailored for platforms like Instagram, LinkedIn, and Facebook, helping you build a loyal community and increase brand awareness.",
    "Banner Design": "Command attention in both the physical and digital space with our high-impact banner designs. We design with distance, readability, and immediate impact in mind, ensuring your banner achieves its marketing goals whether it's an outdoor vinyl banner or a web ad.",
    "T-Shirt Design": "Transform your brand into wearable art. Our custom apparel designs are created to be stylish, comfortable, and truly representative of your brand's personality. We design t-shirts that people actually want to wear, turning your customers into walking brand ambassadors.",
    "Packaging Design": "Your product's packaging is often its first silent salesman. We create stunning, functional packaging designs that protect your product while telling its story on the shelf, helping your product stand out in a crowded market and delight your customers.",
    "Illustration": "Add a unique, human touch to your brand with custom illustrations. We create hand-crafted artwork that communicates complex ideas simply and beautifully, helping differentiate your brand and making your marketing materials feel more authentic and engaging.",
    "Motion Graphics": "Static images can only say so much. Our motion graphics services bring your visual identity to life through dynamic animations. From engaging explainer videos to animated social media content, we capture attention and simplify complex concepts.",
    "Video Editing": "Transform your raw footage into polished, professional videos. We enhance pacing, add seamless transitions, perform color correction, and integrate sound design to ensure your final video is impactful, engaging, and perfectly aligned with your brand message.",
    "2D/3D Animation": "Step into a world of limitless creativity with our animation services. We create captivating animated content to explain products, entertain audiences, or visualize concepts, bringing your most ambitious ideas to life with stunning detail and smooth motion.",
    "3D Modeling": "Bring concepts into the third dimension with our high-quality 3D modeling services. We create accurate, detailed models for product visualization, architecture, and marketing, optimized for visual fidelity and performance across various applications.",
    "UI/UX Design": "A beautiful app is nothing if it's hard to use. Our UI/UX design process ensures your digital products are both stunning and highly intuitive. We create seamless user journeys that reduce friction, delight users, and drive conversions across web and mobile.",
    "Website/App Development": "Turn incredible designs into fully functional digital realities. Our development team builds responsive, high-performance websites and mobile applications using modern frameworks, ensuring your platform is fast, secure, scalable, and flawless on all devices.",
    "Digital Marketing": "Beautiful design needs to be seen. Our data-driven digital marketing strategies help grow your audience and drive meaningful traffic to your brand. We analyze market trends to ensure your brand reaches the right people at the right time, maximizing your ROI."
  };

  const defaultDesc = "We provide comprehensive design and development solutions tailored to elevate your business. Our expert team ensures high quality and timely delivery for all your project needs.";
  const currentService = services.find(s => s.title === title);
  const displayPrice = currentService?.price || '₹1,000*';
  const priceParts = displayPrice.split('*');

  const serviceImages = {
    "Logo Design": imgLogo,
    "Branding Design": imgBranding,
    "Business Card Design": imgBusinessCards,
    "Flyer/Leaflet Design": imgFlyers,
    "Social Media Post Design": imgSocialMedia,
    "Banner Design": imgBanner,
    "T-Shirt Design": imgTshirts,
    "Packaging Design": imgPackage,
    "Illustration": imgIllustration,
    "UI/UX Design": imgUI,
    "Website/App Development": imgWebApp,
    "Digital Marketing": imgDigitalMarketing
  };

  return (
    <div 
      className="service-modal-overlay" 
      style={{ animation: isClosing ? 'fadeOutOverlay 0.3s ease-out forwards' : 'fadeInOverlay 0.3s ease-out' }} 
      onClick={handleClose}
    >
      <div className="service-modal-content glass" onClick={(e) => e.stopPropagation()}>
        <div className="service-modal-text">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{title}</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text)', opacity: 0.9 }}>
            {serviceDescriptions[title] || defaultDesc}
          </p>
          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              Pricing starts from: {priceParts[0]}<sup style={{ fontSize: '0.8em' }}>*</sup>{priceParts.slice(1).join('*')}
            </p>
            <button className="btn btn-primary" onClick={() => { onAddToCart({ title, price: displayPrice }); handleClose(); }}>
              Get Quote
            </button>
          </div>
        </div>
        <div className="service-modal-image-wrapper">
          {serviceImages[title] ? (
            <img src={serviceImages[title]} alt={title} className="service-modal-image" />
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', border: '2px dashed var(--color-text-muted)', borderRadius: '1rem', width: '100%', height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Image size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>Space for Picture</p>
            </div>
          )}
        </div>
      </div>
      <button className="service-modal-close-btn" onClick={handleClose}>
        <X size={28} />
      </button>
    </div>
  );
};

// --- Main App ---
const ComingSoonOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="coming-soon-overlay">
      <h1 className="coming-soon-text">Coming Soon</h1>
      <button className="close-btn" onClick={onClose}>
        <X size={24} />
      </button>
    </div>
  );
};

const GraphicDesignOverlay = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const images = import.meta.glob('./assets/Graphics Design/**/*.{jpg,jpeg,png,webp,gif}', { eager: true, import: 'default' });

  const groupedImages = {};
  for (const path in images) {
    const parts = path.split('/');
    if (parts.length >= 5) {
      const subfolder = parts[parts.length - 2];
      if (!groupedImages[subfolder]) {
        groupedImages[subfolder] = [];
      }
      groupedImages[subfolder].push(images[path]);
    }
  }

  return (
    <div className="coming-soon-overlay graphic-design-overlay" style={{ display: 'block', overflowY: 'auto', padding: '2rem', zIndex: 9999, background: 'var(--color-bg)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div className="container" style={{ marginTop: '8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '3rem' }}>
          <button className="back-btn" onClick={onClose}>
            <ArrowLeft size={36} color="#FF5A00" />
          </button>
          <h2 className="section-title text-center" style={{ margin: 0 }}>Graphic Design <span>Portfolio</span></h2>
        </div>
        
        {Object.entries(groupedImages).map(([category, imgs]) => (
          <div key={category} style={{ marginBottom: '3rem' }}>
            <h3 style={{ 
              borderBottom: '2px solid #FF5A00', 
              display: 'inline-block', 
              paddingBottom: '0.5rem', 
              marginBottom: '1.5rem',
              textTransform: 'capitalize',
              fontSize: '1.8rem'
            }}>
              {category.replace(/_/g, ' ')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {imgs.map((src, idx) => (
                <img key={idx} src={src} alt={category} style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Preloader = ({ show }) => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => setRender(false), 500); // wait for fade transition
      return () => clearTimeout(t);
    } else {
      setRender(true);
    }
  }, [show]);

  if (!render) return null;

  return (
    <div className={`preloader-overlay ${!show ? 'fade-out' : ''}`}>
      <img src={gLogoImg} alt="Loading..." className="preloader-logo" />
     
    </div>
  );
};

function WhatsAppButton({ onClick }) {
  return (
    <a className="whatsapp" href="#" onClick={onClick} aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16.04 3.2A12.74 12.74 0 0 0 5.2 22.64L3.6 28.8l6.3-1.55A12.74 12.74 0 1 0 16.04 3.2Zm0 23.08c-2.05 0-4.05-.6-5.75-1.73l-.4-.25-3.72.92.98-3.6-.27-.42A10.18 10.18 0 1 1 16.04 26.28Zm5.58-7.64c-.3-.15-1.8-.9-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.2-.18.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.47.13-.62.14-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.55.72.3 1.28.48 1.72.62.72.23 1.38.2 1.9.12.58-.08 1.8-.73 2.05-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}

// --- Custom Cursor ---
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
    };

    const updateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%), 0)`;
      }
      requestRef.current = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring desktop-only"></div>
      <div ref={dotRef} className="cursor-dot desktop-only"></div>
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [activeOverlayItem, setActiveOverlayItem] = useState(null);
  const [estimatorData, setEstimatorData] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (item) => {
    setEstimatorData(prev => [...prev, item]);
    const newCount = estimatorData.length + 1;
    showToast(`${newCount} item${newCount > 1 ? 's' : ''} added to cart`);
  };
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = sessionStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const currentLogo = isDarkTheme ? logoDarkThemeImg : logoLightThemeImg;
  const currentMsmeLogo = isDarkTheme ? msmeDarkThemeImg : msmeLightThemeImg;

  useEffect(() => {
    sessionStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    if (isDarkTheme) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkTheme]);

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    window.open("https://wa.me/917044495506", "_blank");
  };

  return (
    <>
      <Preloader show={isLoading} />
      {toastMessage && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-primary)', color: '#fff', padding: '10px 20px', borderRadius: '8px', zIndex: 999999, pointerEvents: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontWeight: 'bold' }}>
          {toastMessage}
        </div>
      )}
      <div className="app">
        <CustomCursor />
        {activeOverlayItem === 'Graphic Design' ? (
          <GraphicDesignOverlay isOpen={isOverlayOpen} onClose={() => { setIsOverlayOpen(false); setActiveOverlayItem(null); }} />
        ) : activeOverlayItem?.startsWith('service-') ? (
          <ServiceModal isOpen={isOverlayOpen} onClose={() => { setIsOverlayOpen(false); setActiveOverlayItem(null); }} title={activeOverlayItem.replace('service-', '')} onAddToCart={handleAddToCart} />
        ) : (
          <ComingSoonOverlay isOpen={isOverlayOpen} onClose={() => { setIsOverlayOpen(false); setActiveOverlayItem(null); }} />
        )}
        <Navbar isDarkTheme={isDarkTheme} toggleTheme={() => setIsDarkTheme(!isDarkTheme)} currentLogo={currentLogo} />
        <Hero currentLogo={currentLogo} />
        <StatusBar />
        <Services openOverlay={(title) => { setActiveOverlayItem(title); setIsOverlayOpen(true); }} />
        <WebsiteAndBrandingPackages onAddToCart={handleAddToCart} />
        <AboutUs />
        <Portfolio openOverlay={(title) => { setActiveOverlayItem(title); setIsOverlayOpen(true); }} />
        <OurTeam isDarkTheme={isDarkTheme} />
        <Testimonials />
        <ContactForm 
          externalData={estimatorData} 
          onRemoveService={(idx) => setEstimatorData(prev => prev.filter((_, i) => i !== idx))}
          onClearServices={() => setEstimatorData([])} 
        />
        <Footer currentLogo={currentLogo} currentMsmeLogo={currentMsmeLogo} onWhatsAppClick={handleWhatsAppRedirect} />
        <WhatsAppButton onClick={handleWhatsAppRedirect} />
      </div>
    </>
  );
}

export default App;
