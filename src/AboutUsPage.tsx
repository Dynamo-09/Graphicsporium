import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import './index.css';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <section className="section about-section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="about-content">
            <h2 className="section-title text-left" style={{ marginBottom: '1.5rem' }}>About <span>Us</span></h2>
            <p className="about-description">
              Graphicsporium is a creative studio built on one simple belief: great design shouldn't just look good — it should say something. We're a small, fiercely passionate team of designers, developers, and storytellers who live for the moment an idea on a napkin turns into a brand people remember.
            </p>
            <p className="about-description" style={{ marginBottom: '2.5rem' }}>
              We're new on the scene, and we're proud of it. No bloated processes, no twelve layers of approval, no diluted creativity — just a tight-knit crew that pours real energy and ownership into every single project. Because when you're starting out, your work is your reputation, and we treat it that way.
            </p>

            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>What We Do</h3>
            <p className="about-description" style={{ marginBottom: '1.5rem' }}>
              We're a full creative suite, which means we don't just hand you a logo and wave goodbye. From the first spark of an idea to the final pixel-perfect launch, we cover:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                <h4 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Branding & Identity</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Logos, color systems, typography, and brand guidelines that give your business a personality worth remembering.</p>
              </div>
              <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                <h4 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Web Design & Development</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Fast, modern, responsive websites that don't just look stunning but actually work for your business.</p>
              </div>
              <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                <h4 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Social Media Design</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>Bold, scroll-stopping content that keeps your audience engaged and your feed on-brand.</p>
              </div>
              <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                <h4 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Print Design</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>From business cards to brochures and packaging, beautifully crafted materials that make a real-world impression.</p>
              </div>
            </div>

            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Our Approach</h3>
            <p className="about-description" style={{ marginBottom: '3rem' }}>
              We design with intention. Every project starts with a conversation — understanding your story, your audience, and what makes you <em>you</em>. From there, we mix strategy with bold creative instincts to build visuals that don't blend in. Whether it's a single logo or a complete brand overhaul across digital and print, we treat every client like our biggest one yet.
            </p>

            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Why Graphicsporium</h3>
            <ul className="about-features">
              <li>
                <CheckCircle className="feature-icon" />
                <div>
                  <h4>Dedicated Team</h4>
                  <p>A dedicated team genuinely invested in your brand's success — not just another account number.</p>
                </div>
              </li>
              <li>
                <CheckCircle className="feature-icon" />
                <div>
                  <h4>Bold Creative Direction</h4>
                  <p>Original creative direction instead of cookie-cutter templates and "good enough" design.</p>
                </div>
              </li>
              <li>
                <CheckCircle className="feature-icon" />
                <div>
                  <h4>One Studio, Every Discipline</h4>
                  <p>Branding, web, social, and print, all working from the same vision.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
