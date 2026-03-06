import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const PricingSection = ({ onDemoRequest }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mockData.pricing.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="label mb-3 block">Pricing</span>
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="body-lg mb-8">
            Choose the plan that fits your AI visibility goals.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual
                  ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Annual
              <span className="text-xs font-semibold text-[var(--accent-primary)] bg-[var(--accent-bg)] px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {mockData.pricing.map((plan, index) => {
            const isVisible = visibleCards.includes(index);
            const price = isAnnual ? plan.annualPrice : plan.price;

            return (
              <div
                key={plan.id}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${plan.popular ? 'md:-mt-4 md:mb-[-16px]' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative rounded-2xl border p-7 flex flex-col h-full ${
                  plan.popular
                    ? 'bg-[var(--bg-tertiary)] border-[var(--accent-primary)]/30 shadow-lg shadow-[var(--accent-primary)]/5'
                    : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)]'
                }`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[var(--accent-primary)] text-[var(--bg-primary)] px-4 py-1 rounded-full text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Info */}
                  <div className="mb-6">
                    <h3 className="h3 text-[var(--text-primary)] mb-1">{plan.name}</h3>
                    <p className="body-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-[var(--border-subtle)]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[var(--text-primary)]">${price}</span>
                      <span className="body-sm">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-xs text-[var(--accent-primary)] mt-1.5 font-medium">
                        Save ${(plan.price - plan.annualPrice) * 12}/year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-7">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check size={16} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                        <span className="body-sm text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={plan.cta === 'Book Demo' ? onDemoRequest : undefined}
                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="body-md text-[var(--text-secondary)] mb-3">
            Need a custom solution?
          </p>
          <button onClick={onDemoRequest} className="btn-ghost text-[var(--accent-primary)] hover:text-[var(--accent-hover)]">
            Contact Sales
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
