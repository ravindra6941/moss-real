import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Target, Zap, Globe, Award, Mail, Linkedin, Menu, X } from 'lucide-react';
import { mockAboutData } from '../data/mockAboutData';

const iconMap = { Users, Target, Zap, Globe, Award };

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setVisibleSections(prev => [...new Set([...prev, sectionName])]);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
  ];

  return (
    <div className="about-page">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <a href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-extrabold text-sm leading-none">MP</span>
              </div>
              <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">MossPilot</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="btn-ghost text-sm">{link.label}</a>
              ))}
              <a href="/about" className="btn-ghost text-sm text-[var(--accent-primary)]">About</a>
              <div className="w-px h-6 bg-[var(--border-primary)] mx-3" />
              <a href="/" className="btn-primary text-sm py-2.5 px-5">Get Started</a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors text-sm font-medium no-underline">
                  {link.label}
                </a>
              ))}
              <a href="/about" className="py-3 px-4 text-[var(--accent-primary)] bg-[var(--accent-bg)] rounded-lg text-sm font-medium no-underline">About</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center hero-gradient overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--accent-primary)] opacity-[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="label mb-4 block">About MossPilot</span>
              <h1 className="display-lg text-[var(--text-primary)] mb-6">
                {mockAboutData.hero.headline}
              </h1>
            </div>
            <div className={`transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className="body-lg max-w-2xl mx-auto mb-8">{mockAboutData.hero.description}</p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a href="/#pricing" className="btn-primary">
                Start Your Journey <ArrowRight size={16} />
              </a>
              <a href="#team" className="btn-secondary">Meet Our Team</a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Stats */}
      <section data-section="mission" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${
              visibleSections.includes('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <span className="label mb-3 block">Our Mission</span>
              <h2 className="display-sm text-[var(--text-primary)] mb-5">{mockAboutData.mission.title}</h2>
              <p className="body-lg mb-6">{mockAboutData.mission.description}</p>
              <div className="space-y-3">
                {mockAboutData.mission.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full mt-2.5 flex-shrink-0" />
                    <p className="body-md text-[var(--text-secondary)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${
              visibleSections.includes('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                {mockAboutData.stats.map((stat, i) => {
                  const IconComponent = iconMap[stat.icon];
                  return (
                    <div key={i} className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-subtle)] text-center">
                      <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center mx-auto mb-3">
                        <IconComponent size={22} className="text-[var(--accent-primary)]" />
                      </div>
                      <div className="text-2xl font-bold text-[var(--accent-primary)] mb-1">{stat.value}</div>
                      <div className="body-sm">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-section="values" className="section-padding bg-[var(--bg-primary)]">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="label mb-3 block">Our Values</span>
            <h2 className="display-md text-[var(--text-primary)] mb-4">Core Values</h2>
            <p className="body-lg">The principles that guide everything we do at MossPilot.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockAboutData.values.map((value, index) => {
              const IconComponent = iconMap[value.icon];
              return (
                <div
                  key={index}
                  className={`feature-card transition-all duration-500 ${
                    visibleSections.includes('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center mb-4">
                    <IconComponent size={20} className="text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="h3 text-[var(--text-primary)] mb-2">{value.title}</h3>
                  <p className="body-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" data-section="team" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="label mb-3 block">Our Team</span>
            <h2 className="display-md text-[var(--text-primary)] mb-4">Meet the Team</h2>
            <p className="body-lg">The minds behind MossPilot's AI visibility platform.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {mockAboutData.team.map((member, index) => (
              <div
                key={index}
                className={`feature-card text-center transition-all duration-500 ${
                  visibleSections.includes('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-[var(--accent-bg)] border border-[var(--accent-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-xl font-bold text-[var(--accent-primary)]">{member.avatar}</span>
                </div>
                <h3 className="h3 text-[var(--text-primary)] mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-[var(--accent-primary)] mb-3">{member.role}</p>
                <p className="body-sm mb-5">{member.bio}</p>
                <div className="flex justify-center gap-2">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-section="cta" className="section-padding bg-[var(--bg-primary)]">
        <div className="container">
          <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            visibleSections.includes('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Ready to Transform Your AI Visibility?
            </h2>
            <p className="body-lg mb-8">
              Join companies already optimizing for the future of search with MossPilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/#pricing" className="btn-primary glow-effect">
                Get Started Today <ArrowRight size={16} />
              </a>
              <a href="/#features" className="btn-secondary">Explore Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="flex items-center gap-2 no-underline">
              <div className="w-7 h-7 bg-[var(--accent-primary)] rounded-md flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-extrabold text-xs leading-none">MP</span>
              </div>
              <span className="text-base font-bold text-[var(--text-primary)]">MossPilot</span>
            </a>
            <div className="flex gap-6">
              <a href="/" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Home</a>
              <a href="/about" className="body-sm text-[var(--accent-primary)] no-underline">About</a>
              <a href="/#features" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Features</a>
              <a href="/#pricing" className="body-sm hover:text-[var(--text-secondary)] transition-colors no-underline">Pricing</a>
            </div>
            <p className="body-sm">&copy; {new Date().getFullYear()} MossPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
