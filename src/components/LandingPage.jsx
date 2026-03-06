import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import HeroSection from './HeroSection';
import WorkflowSection from './WorkflowSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import Footer from './Footer';
import DemoModal from './DemoModal';

const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleDemoRequest = () => {
    setIsDemoModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#workflow' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-extrabold text-sm leading-none">MP</span>
              </div>
              <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">MossPilot</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="btn-ghost text-sm">
                  {link.label}
                </a>
              ))}
              <div className="w-px h-6 bg-[var(--border-primary)] mx-3" />
              <button onClick={handleDemoRequest} className="btn-primary text-sm py-2.5 px-5">
                Book a Demo
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors text-sm font-medium no-underline"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-[var(--border-subtle)]">
                <button onClick={handleDemoRequest} className="btn-primary w-full text-sm">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection onDemoRequest={handleDemoRequest} />
        <WorkflowSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection onDemoRequest={handleDemoRequest} />
        <Footer onDemoRequest={handleDemoRequest} />
      </main>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default LandingPage;
