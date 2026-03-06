import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const Footer = ({ onDemoRequest }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'How It Works', href: '#workflow' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      {/* CTA Section */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="container py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Ready to Own the Future of SEO?
            </h2>
            <p className="body-lg mb-8">
              Join companies already optimizing for AI visibility with MossPilot.
            </p>
            <button onClick={onDemoRequest} className="btn-primary glow-effect px-8">
              Start with MossPilot Today
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-extrabold text-sm leading-none">MP</span>
              </div>
              <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">MossPilot</span>
            </div>
            <p className="body-md max-w-sm mb-6">
              Transform your SEO strategy for the AI era. Get discovered where your customers are actually searching.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Stay updated</p>
              <NewsletterSignup source="footer" />
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <a href="mailto:team@mosspilot.com" className="flex items-center gap-2.5 body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">
                <Mail size={14} className="text-[var(--text-muted)]" />
                team@mosspilot.com
              </a>
              <div className="flex items-center gap-2.5 body-sm">
                <Phone size={14} className="text-[var(--text-muted)]" />
                +91 8824920949
              </div>
              <div className="flex items-center gap-2.5 body-sm">
                <MapPin size={14} className="text-[var(--text-muted)]" />
                Jodhpur, India
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Legal</h4>
            <ul className="space-y-2.5 mb-8">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Follow Us</h4>
            <div className="flex gap-2">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="container py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-sm">
              &copy; {currentYear} MossPilot. All rights reserved.
            </p>
            <p className="body-sm">
              Powered by <span className="text-[var(--accent-primary)] font-medium">AIVO</span> Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
