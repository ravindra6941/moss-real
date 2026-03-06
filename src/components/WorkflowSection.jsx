import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, Shield, Zap, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const iconMap = { Search, Eye, Shield, Zap };

const WorkflowSection = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mockData.workflow.steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="workflow" ref={sectionRef} className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="label mb-3 block">How It Works</span>
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            {mockData.workflow.title}
          </h2>
          <p className="body-lg">
            {mockData.workflow.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockData.workflow.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              const isVisible = visibleSteps.includes(index);

              return (
                <div
                  key={step.id}
                  className={`relative transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Step Number & Line */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[var(--bg-primary)] text-sm font-bold">{step.id}</span>
                    </div>
                    {index < mockData.workflow.steps.length - 1 && (
                      <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-[var(--border-primary)] to-transparent" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="feature-card h-full">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center mb-4">
                      <IconComponent size={20} className="text-[var(--accent-primary)]" />
                    </div>
                    <h3 className="h3 text-[var(--text-primary)] mb-2">{step.title}</h3>
                    <p className="body-sm mb-4">{step.description}</p>
                    <div className="px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                      <p className="text-xs font-medium text-[var(--accent-primary)]">{step.stats}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#features" className="btn-secondary">
            Explore AIVO Features
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
