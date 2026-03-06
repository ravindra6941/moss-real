import React from 'react';
import { ArrowRight, Mail, Twitter, Linkedin } from 'lucide-react';

const Footer = ({ onDemoRequest }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-secondary)]">
      {/* CTA Banner */}
      <div className="border-y border-[var(--border-subtle)]">
        <div className="container py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="h1 text-[var(--text-primary)] mb-2">Ready to get started?</h3>
              <p className="body-md">Optimize your brand for AI-driven search today.</p>
            </div>
            <button onClick={onDemoRequest} className="btn-primary flex-shrink-0">
              Book a Demo
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 bg-[var(--accent-primary)] rounded-md flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-extrabold text-xs leading-none">MP</span>
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">MossPilot</span>
            </div>
            <p className="body-sm max-w-xs">
              AI Visibility Optimization Platform.
              <br />Powered by AIVO technology.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16">
            <div>
              <h5 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">Product</h5>
              <ul className="space-y-2">
                <li><a href="#features" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Features</a></li>
                <li><a href="#pricing" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Pricing</a></li>
                <li><a href="#workflow" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">Company</h5>
              <ul className="space-y-2">
                <li><a href="/about" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">About</a></li>
                <li><a href="mailto:team@mosspilot.com" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Contact</a></li>
                <li><a href="#" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors" aria-label="Twitter">
              <Twitter size={15} />
            </a>
            <a href="#" className="w-8 h-8 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors" aria-label="LinkedIn">
              <Linkedin size={15} />
            </a>
            <a href="mailto:team@mosspilot.com" className="w-8 h-8 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors" aria-label="Email">
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="container py-4">
          <p className="body-sm text-center">
            &copy; {currentYear} MossPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
