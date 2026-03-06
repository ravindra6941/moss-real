import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart3, Bot, Sparkles } from 'lucide-react';
import { mockData } from '../data/mockData';

const HeroSection = ({ onDemoRequest }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--accent-primary)] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[var(--accent-primary)] opacity-[0.02] rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />
      </div>

      <div className="container relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] mb-8">
              <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--text-muted)]">AI Visibility Optimization Platform</span>
            </div>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h1 className="display-lg text-[var(--text-primary)] mb-6">
              {mockData.hero.headline.split('AIVO').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-[var(--accent-primary)]">AIVO</span>}
                </span>
              ))}
            </h1>
          </div>

          {/* Subheadline */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="body-lg max-w-2xl mx-auto mb-10">
              {mockData.hero.subheadline}
            </p>
          </div>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button className="btn-primary glow-effect px-8">
              {mockData.hero.primaryCTA}
              <ArrowRight size={18} />
            </button>
            <button onClick={onDemoRequest} className="btn-secondary">
              {mockData.hero.secondaryCTA}
            </button>
          </div>

          {/* Stats Row */}
          <div className={`transition-all duration-700 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Prompts Analyzed', value: mockData.stats.prompts, icon: Sparkles },
                { label: 'Companies Trust Us', value: mockData.stats.companies, icon: Bot },
                { label: 'AI Platforms', value: mockData.stats.platforms, icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)]/60 border border-[var(--border-subtle)] backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center flex-shrink-0">
                    <stat.icon size={18} className="text-[var(--accent-primary)]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-[var(--text-primary)] leading-none mb-0.5">{stat.value}</div>
                    <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
