import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={16} className="text-[var(--text-muted)]" />
        </button>

        <div className="p-6">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="h2 text-[var(--text-primary)] mb-1">Book Your Demo</h2>
                <p className="body-sm">
                  See how MossPilot can transform your AI visibility.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field" placeholder="John" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" placeholder="Doe" required />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Work Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" placeholder="john@company.com" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>

                {/* Company */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Company *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="input-field" placeholder="Your Company" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Company Size *</label>
                    <select name="companySize" value={formData.companySize} onChange={handleInputChange} className="input-field appearance-none" required>
                      <option value="">Select size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Job Title</label>
                  <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="input-field" placeholder="e.g. Marketing Manager" />
                </div>

                {/* Use Case */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">What are your AI visibility goals?</label>
                  <textarea name="useCase" value={formData.useCase} onChange={handleInputChange} className="input-field" placeholder="Tell us about your goals..." rows={3} />
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-2">
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

                <p className="text-[11px] text-[var(--text-muted)] text-center">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </>
          ) : (
            /* Success */
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-[var(--accent-primary)]" />
              </div>

              <h2 className="h2 text-[var(--text-primary)] mb-2">Demo Booked!</h2>
              <p className="body-sm mb-6">
                Our team will reach out within 24 hours to schedule your personalized demo.
              </p>

              <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-6 text-left">
                <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-2">What happens next?</h3>
                <ul className="space-y-2">
                  {[
                    "Calendar invite within 24 hours",
                    "Custom demo prepared by our AI visibility expert",
                    "Actionable insights for your brand's AI presence"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[var(--text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={handleClose} className="btn-secondary text-sm">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
