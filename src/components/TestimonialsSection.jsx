import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % mockData.testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setActiveIndex(index);
  const goPrev = () => setActiveIndex(prev => (prev - 1 + mockData.testimonials.length) % mockData.testimonials.length);
  const goNext = () => setActiveIndex(prev => (prev + 1) % mockData.testimonials.length);

  const testimonial = mockData.testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-12 max-w-2xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <span className="label mb-3 block">Testimonials</span>
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="body-lg">
            See how companies are transforming their visibility in the AI era.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-12">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-[var(--accent-primary)] fill-[var(--accent-primary)]" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="h2 text-[var(--text-primary)] mb-8 leading-relaxed font-medium">
              "{testimonial.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--accent-bg)] border border-[var(--accent-primary)]/20 rounded-full flex items-center justify-center">
                <span className="text-[var(--accent-primary)] font-bold text-sm">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <div className="font-semibold text-[var(--text-primary)] text-sm">
                  {testimonial.author}
                </div>
                <div className="body-sm">
                  {testimonial.title}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-5">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} className="text-[var(--text-muted)]" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-5">
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} className="text-[var(--text-muted)]" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {mockData.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-[var(--accent-primary)]'
                    : 'w-1.5 bg-[var(--border-primary)] hover:bg-[var(--text-muted)]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
