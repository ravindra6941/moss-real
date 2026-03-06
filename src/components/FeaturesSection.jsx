import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, PenTool, Brain, Globe, Award, Check } from 'lucide-react';
import { mockData } from '../data/mockData';

const iconMap = { TrendingUp, Users, PenTool, Brain, Globe, Award };

const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mockData.features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => [...new Set([...prev, index])]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="label mb-3 block">Features</span>
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            Powerful Tools for AI Visibility
          </h2>
          <p className="body-lg">
            Everything you need to dominate AI search results and stay ahead of the competition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="card-grid-3">
          {mockData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            const isVisible = visibleFeatures.includes(index);

            return (
              <div
                key={feature.id}
                className={`feature-card transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center mb-5">
                  <IconComponent size={22} className="text-[var(--accent-primary)]" />
                </div>

                <h3 className="h3 text-[var(--text-primary)] mb-3">{feature.title}</h3>
                <p className="body-md mb-5">{feature.description}</p>

                <div className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
                  {feature.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check size={14} className="text-[var(--accent-primary)] flex-shrink-0" />
                      <span className="body-sm text-[var(--text-secondary)]">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
