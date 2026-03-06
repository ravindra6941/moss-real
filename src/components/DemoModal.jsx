import React, { useState } from 'react';
import { X, Building, Users, Phone, Mail, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    jobTitle: '',
    useCase: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API}/demo-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.detail || 'Failed to submit demo request');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', companySize: '', jobTitle: '', useCase: '' });
    setIsSubmitted(false);
    setIsSubmitting(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={18} className="text-[var(--text-muted)]" />
        </button>

        <div className="p-7">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-7">
                <h2 className="h1 text-[var(--text-primary)] mb-2">Book Your Demo</h2>
                <p className="body-md">
                  Get a personalized walkthrough of how MossPilot can transform your AI visibility.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5">First Name *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field pl-10" placeholder="John" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" placeholder="Doe" required />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Work Email *</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field pl-10" placeholder="john@company.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Phone</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field pl-10" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Company *</label>
                    <div className="relative">
                      <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="input-field pl-10" placeholder="Your Company" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Company Size *</label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <select name="companySize" value={formData.companySize} onChange={handleInputChange} className="input-field pl-10 appearance-none" required>
                        <option value="">Select size</option>
                        {companySizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">Job Title</label>
                  <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="input-field" placeholder="e.g. Marketing Manager" />
                </div>

                {/* Use Case */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1.5">What are your AI visibility goals?</label>
                  <textarea name="useCase" value={formData.useCase} onChange={handleInputChange} className="input-field resize-none h-20" placeholder="Tell us about your goals..." />
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book Demo
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-xs text-[var(--text-muted)] text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </>
          ) : (
            /* Success */
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-[var(--accent-bg)] border border-[var(--accent-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-[var(--accent-primary)]" />
              </div>

              <h2 className="h1 text-[var(--text-primary)] mb-3">Demo Booked!</h2>
              <p className="body-md mb-6">
                Thank you for your interest in MossPilot. Our team will reach out within 24 hours to schedule your personalized demo.
              </p>

              <div className="bg-[var(--bg-primary)] rounded-xl p-5 mb-6 text-left">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">What happens next?</h3>
                <ul className="space-y-2.5">
                  {[
                    "We'll send you a calendar invite within 24 hours",
                    "Our AI visibility expert will prepare a custom demo",
                    "Get actionable insights for your brand's AI presence"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                      <span className="body-sm text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={handleClose} className="btn-primary">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
