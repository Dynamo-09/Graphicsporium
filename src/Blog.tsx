import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import blog1Img from './assets/blog1.png';
import blog2Img from './assets/blog2.png';
import blog3Img from './assets/blog3.png';
import blog4Img from './assets/blog4.png';
import blog5Img from './assets/blog5.png';
import blog6Img from './assets/blog6.png';

const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-slate-bg)', minHeight: '100vh', width: '100%' }}>
      <div style={{ padding: '130px 20px 80px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
      {/* Fixed Back Button */}
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          position: 'fixed',
          top: '110px',
          left: '20px',
          background: 'transparent', 
          border: '1px solid var(--color-border)', 
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center', 
          color: 'var(--color-primary)', 
          zIndex: 1000,
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = 'var(--color-surface-light, rgba(255,255,255,0.05))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label="Go back to main website"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="section-title" style={{ marginTop: '40px' }}>
        Our <span>Blog</span>
      </h2>
      <p className="section-subtitle" style={{ marginBottom: '60px' }}>
        Actionable tips on crafting stunning visual identities and robust websites that grow your brand
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', justifyContent: 'center' }}>
        
        {/* Blog Card */}
        <div 
          onClick={() => navigate('/blog/web-design-trends')}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={blog1Img} 
              alt="Blog Thumbnail" 
              style={{ width: '100%', height: '240px', objectFit: 'contain', backgroundColor: '#fff' }} 
            />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ARTICLE
            </div>
          </div>
          
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-heading)', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Web Design Trends 2026: What Every Business Should Know
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                READ MORE...
              </span>
            </div>
          </div>
        </div>

        {/* Blog Card 2 */}
        <div 
          onClick={() => navigate('/blog/ai-in-graphic-design')}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={blog3Img} 
              alt="Blog Thumbnail" 
              style={{ width: '100%', height: '240px', objectFit: 'contain', backgroundColor: '#fff' }} 
            />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ARTICLE
            </div>
          </div>
          
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-heading)', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              AI in Graphic Design: Threat, Tool, or Both?
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                READ MORE...
              </span>
            </div>
          </div>
        </div>

        {/* Blog Card 3 */}
        <div 
          onClick={() => navigate('/blog/psychology-of-color')}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={blog2Img} 
              alt="Blog Thumbnail" 
              style={{ width: '100%', height: '240px', objectFit: 'contain', backgroundColor: '#fff' }} 
            />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ARTICLE
            </div>
          </div>
          
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-heading)', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Psychology of Color in Branding: What Your Palette Says
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                READ MORE...
              </span>
            </div>
          </div>
        </div>

        {/* Blog Card 4 */}
        <div 
          onClick={() => navigate('/blog/logo-design-vs-brand-identity')}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={blog4Img} 
              alt="Blog Thumbnail" 
              style={{ width: '100%', height: '240px', objectFit: 'contain', backgroundColor: '#fff' }} 
            />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ARTICLE
            </div>
          </div>
          
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-heading)', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Logo Design vs Brand Identity: What's the Difference?
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                READ MORE...
              </span>
            </div>
          </div>
        </div>

        {/* Blog Card 5 */}
        <div 
          onClick={() => navigate('/blog/startup-professional-brand-kit')}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={blog5Img} 
              alt="Blog Thumbnail" 
              style={{ width: '100%', height: '240px', objectFit: 'contain', backgroundColor: '#fff' }} 
            />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ARTICLE
            </div>
          </div>
          
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-heading)', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              Why Every Startup Needs a Professional Brand Kit
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                READ MORE...
              </span>
            </div>
          </div>
        </div>

        {/* Blog Card 6 */}
        <div 
          onClick={() => navigate('/blog/ui-vs-ux-design')}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            textAlign: 'left',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ position: 'relative' }}>
            <img 
              src={blog6Img} 
              alt="Blog Thumbnail" 
              style={{ width: '100%', height: '240px', objectFit: 'contain', backgroundColor: '#fff' }} 
            />
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'var(--color-primary)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>
              ARTICLE
            </div>
          </div>
          
          <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: 'var(--color-text)', 
              fontFamily: 'var(--font-heading)', 
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              UI vs UX Design: What's the Difference?
            </h3>
            
            <div style={{ marginTop: 'auto' }}>
              <span style={{ 
                color: 'var(--color-primary)', 
                fontWeight: '700', 
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                READ MORE...
              </span>
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Blog;
