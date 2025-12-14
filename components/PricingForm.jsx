'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING, calculateTotalPrice } from '@/lib/validation';

// Step indicator component
function StepIndicator({ currentStep, totalSteps }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                    <motion.div
                        animate={{
                            scale: i + 1 === currentStep ? 1.2 : 1,
                            backgroundColor: i + 1 <= currentStep ? '#01b793' : '#1a3a35',
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${i + 1 <= currentStep ? 'text-white' : 'text-[#afbfc1]'
                            }`}
                    >
                        {i + 1 <= currentStep ? (
                            i + 1 < currentStep ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                i + 1
                            )
                        ) : (
                            i + 1
                        )}
                    </motion.div>
                    {i < totalSteps - 1 && (
                        <div className={`w-12 h-0.5 ${i + 1 < currentStep ? 'bg-[#01b793]' : 'bg-[#1a3a35]'}`} />
                    )}
                </div>
            ))}
        </div>
    );
}

// Service option card
function ServiceOption({ label, price, description, selected, onChange, disabled }) {
    return (
        <motion.label
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={`relative block p-4 rounded-xl border-2 cursor-pointer transition-all ${disabled
                ? 'opacity-50 cursor-not-allowed bg-[#0a1f1c] border-[#1a3a35]'
                : selected
                    ? 'bg-[#01b793]/10 border-[#01b793] shadow-lg shadow-[#01b793]/10'
                    : 'bg-[#0a1f1c] border-[#1a3a35] hover:border-[#01b793]/50'
                }`}
        >
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => !disabled && onChange(e.target.checked)}
                disabled={disabled}
                className="sr-only"
            />
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${selected ? 'bg-[#01b793] border-[#01b793]' : 'border-[#afbfc1]'
                                }`}
                        >
                            {selected && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span className="font-medium text-white">{label}</span>
                    </div>
                    {description && <p className="mt-2 text-sm text-[#afbfc1] ml-8">{description}</p>}
                </div>
                <span className="text-[#01b793] font-bold">₹{price.toLocaleString()}</span>
            </div>
        </motion.label>
    );
}

// Radio option for exclusive selection
function RadioOption({ label, price, description, selected, onChange, name }) {
    return (
        <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative block p-4 rounded-xl border-2 cursor-pointer transition-all ${selected
                ? 'bg-[#01b793]/10 border-[#01b793] shadow-lg shadow-[#01b793]/10'
                : 'bg-[#0a1f1c] border-[#1a3a35] hover:border-[#01b793]/50'
                }`}
        >
            <input
                type="radio"
                name={name}
                checked={selected}
                onChange={() => onChange(true)}
                className="sr-only"
            />
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-[#01b793]' : 'border-[#afbfc1]'
                                }`}
                        >
                            {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#01b793]" />}
                        </div>
                        <span className="font-medium text-white">{label}</span>
                    </div>
                    {description && <p className="mt-2 text-sm text-[#afbfc1] ml-8">{description}</p>}
                </div>
                <span className="text-[#01b793] font-bold">₹{price.toLocaleString()}</span>
            </div>
        </motion.label>
    );
}

export default function PricingForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    // Form data
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        businessSummary: '',
        additionalInfo: '',
        services: {
            frontend: { tier: null, price: 0 },
            backend: { tier: null, price: 0 },
            mongodb: { features: [], price: 0 },
            uropay: { included: false, price: 0 },
        },
    });

    // Check if backend is required
    const isBackendRequired =
        formData.services.mongodb.features.length > 0 || formData.services.uropay.included;

    // Calculate total
    const totalPrice = calculateTotalPrice(formData.services);

    // Validate step
    const validateStep = (stepNum) => {
        const newErrors = {};

        if (stepNum === 1) {
            if (!formData.clientName || formData.clientName.trim().length < 2) {
                newErrors.clientName = 'Name must be at least 2 characters';
            }
            if (!formData.clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
                newErrors.clientEmail = 'Please enter a valid email';
            }
            if (!formData.clientPhone || !/^[6-9]\d{9}$/.test(formData.clientPhone)) {
                newErrors.clientPhone = 'Please enter a valid 10-digit Indian phone number';
            }
        }

        if (stepNum === 2) {
            if (!formData.services.frontend.tier) {
                newErrors.frontend = 'Please select a frontend option';
            }
            if (isBackendRequired && !formData.services.backend.tier) {
                newErrors.backend = 'Backend is required when MongoDB or Uropay is selected';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle next step
    const handleNext = () => {
        if (validateStep(step)) {
            setStep((s) => Math.min(s + 1, 3));
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        if (!validateStep(2)) {
            setStep(2);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientName: formData.clientName,
                    clientEmail: formData.clientEmail,
                    clientPhone: formData.clientPhone,
                    businessSummary: formData.businessSummary,
                    additionalInfo: formData.additionalInfo,
                    services: formData.services,
                    totalPrice,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ success: true, message: 'Order submitted successfully!', orderId: data.orderId });
            } else {
                setSubmitStatus({ success: false, message: data.error || 'Failed to submit order' });
            }
        } catch (error) {
            setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Update frontend selection
    const updateFrontend = (tier) => {
        setFormData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                frontend: { tier, price: PRICING.frontend[tier] },
            },
        }));
    };

    // Update backend selection
    const updateBackend = (tier) => {
        setFormData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                backend: tier ? { tier, price: PRICING.backend[tier] } : { tier: null, price: 0 },
            },
        }));
    };

    // Update MongoDB features
    const updateMongoDB = (feature, checked) => {
        setFormData((prev) => {
            let features = [...prev.services.mongodb.features];

            if (feature === 'combo') {
                features = checked ? ['combo'] : [];
            } else {
                if (checked) {
                    features = features.filter((f) => f !== 'combo');
                    if (!features.includes(feature)) features.push(feature);
                    // Check if both user and gridfs are selected, auto-select combo
                    if (features.includes('user') && features.includes('gridfs')) {
                        features = ['combo'];
                    }
                } else {
                    features = features.filter((f) => f !== feature);
                }
            }

            let price = 0;
            if (features.includes('combo')) {
                price = PRICING.mongodb.combo;
            } else {
                features.forEach((f) => {
                    price += PRICING.mongodb[f] || 0;
                });
            }

            return {
                ...prev,
                services: {
                    ...prev.services,
                    mongodb: { features, price },
                },
            };
        });
    };

    // Update Uropay
    const updateUropay = (included) => {
        setFormData((prev) => ({
            ...prev,
            services: {
                ...prev.services,
                uropay: { included, price: included ? PRICING.uropay : 0 },
            },
        }));
    };

    // Success screen
    if (submitStatus?.success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#01b793]/20 flex items-center justify-center"
                >
                    <svg className="w-10 h-10 text-[#01b793]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Order Submitted!</h3>
                <p className="text-[#afbfc1] mb-4">We&apos;ll get back to you within 24 hours.</p>
                <p className="text-sm text-[#01b793]">Order ID: {submitStatus.orderId}</p>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <StepIndicator currentStep={step} totalSteps={3} />

            <AnimatePresence mode="wait">
                {/* Step 1: Client Information */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-[#afbfc1] mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                className={`w-full px-4 py-3 bg-[#0a1f1c] border-2 rounded-xl text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793] transition-colors ${errors.clientName ? 'border-red-500' : 'border-[#1a3a35]'
                                    }`}
                                placeholder="John Doe"
                            />
                            {errors.clientName && <p className="mt-1 text-sm text-red-500">{errors.clientName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#afbfc1] mb-2">Email Address</label>
                            <input
                                type="email"
                                value={formData.clientEmail}
                                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                className={`w-full px-4 py-3 bg-[#0a1f1c] border-2 rounded-xl text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793] transition-colors ${errors.clientEmail ? 'border-red-500' : 'border-[#1a3a35]'
                                    }`}
                                placeholder="john@example.com"
                            />
                            {errors.clientEmail && <p className="mt-1 text-sm text-red-500">{errors.clientEmail}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#afbfc1] mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={formData.clientPhone}
                                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                className={`w-full px-4 py-3 bg-[#0a1f1c] border-2 rounded-xl text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793] transition-colors ${errors.clientPhone ? 'border-red-500' : 'border-[#1a3a35]'
                                    }`}
                                placeholder="9876543210"
                            />
                            {errors.clientPhone && <p className="mt-1 text-sm text-red-500">{errors.clientPhone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#afbfc1] mb-2">
                                Business Summary
                                <span className="text-[#afbfc1]/50 ml-1">(optional)</span>
                            </label>
                            <textarea
                                value={formData.businessSummary}
                                onChange={(e) => setFormData({ ...formData, businessSummary: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#0a1f1c] border-2 border-[#1a3a35] rounded-xl text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793] transition-colors resize-none"
                                placeholder="Tell us about your business, what you do, and your target audience..."
                            />
                            <p className="mt-1 text-xs text-[#afbfc1]/70">Help us understand your brand and goals</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#afbfc1] mb-2">
                                Additional Information
                                <span className="text-[#afbfc1]/50 ml-1">(optional)</span>
                            </label>
                            <textarea
                                value={formData.additionalInfo}
                                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#0a1f1c] border-2 border-[#1a3a35] rounded-xl text-white placeholder-[#afbfc1]/50 focus:outline-none focus:border-[#01b793] transition-colors resize-none"
                                placeholder="Any specific features, design inspirations, deadlines, or requirements we should know about..."
                            />
                            <p className="mt-1 text-xs text-[#afbfc1]/70">Include links to reference websites, color preferences, or special requirements</p>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-[0.98]"
                        >
                            Continue to Services
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Service Selection */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        {/* Frontend - Required */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                Frontend
                                <span className="text-xs px-2 py-1 bg-[#01b793] rounded-full">Required</span>
                            </h3>
                            <div className="space-y-3">
                                <RadioOption
                                    name="frontend"
                                    label="Modern Website"
                                    price={PRICING.frontend.modern}
                                    description="Clean, responsive design with modern styling"
                                    selected={formData.services.frontend.tier === 'modern'}
                                    onChange={() => updateFrontend('modern')}
                                />
                                <RadioOption
                                    name="frontend"
                                    label="Animations + Custom Theme"
                                    price={PRICING.frontend.animations}
                                    description="Premium animations, scroll effects, and custom branding"
                                    selected={formData.services.frontend.tier === 'animations'}
                                    onChange={() => updateFrontend('animations')}
                                />
                                <RadioOption
                                    name="frontend"
                                    label="Everything + 1 Revision"
                                    price={PRICING.frontend.everything}
                                    description="All features plus free design revision round"
                                    selected={formData.services.frontend.tier === 'everything'}
                                    onChange={() => updateFrontend('everything')}
                                />
                            </div>
                            {errors.frontend && <p className="mt-2 text-sm text-red-500">{errors.frontend}</p>}
                        </div>

                        {/* Backend - Optional but required if MongoDB/Uropay */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                Backend - Admin Panel
                                {isBackendRequired && (
                                    <span className="text-xs px-2 py-1 bg-amber-500 text-black rounded-full">Required</span>
                                )}
                            </h3>
                            <div className="space-y-3">
                                <RadioOption
                                    name="backend"
                                    label="Modern Admin Panel"
                                    price={PRICING.backend.modern}
                                    description="Clean dashboard with data management"
                                    selected={formData.services.backend.tier === 'modern'}
                                    onChange={() => updateBackend('modern')}
                                />
                                <RadioOption
                                    name="backend"
                                    label="Animations + Theme + Revision"
                                    price={PRICING.backend.premium}
                                    description="Premium admin experience with animations"
                                    selected={formData.services.backend.tier === 'premium'}
                                    onChange={() => updateBackend('premium')}
                                />
                                {formData.services.backend.tier && !isBackendRequired && (
                                    <button
                                        onClick={() => updateBackend(null)}
                                        className="text-sm text-[#afbfc1] hover:text-white underline"
                                    >
                                        Remove backend selection
                                    </button>
                                )}
                            </div>
                            {errors.backend && <p className="mt-2 text-sm text-red-500">{errors.backend}</p>}
                        </div>

                        {/* MongoDB Features */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">MongoDB Features</h3>
                            <div className="space-y-3">
                                <ServiceOption
                                    label="User Management (Signup/Login)"
                                    price={PRICING.mongodb.user}
                                    description="Complete auth system with sessions"
                                    selected={formData.services.mongodb.features.includes('user') || formData.services.mongodb.features.includes('combo')}
                                    onChange={(checked) => updateMongoDB('user', checked)}
                                    disabled={formData.services.mongodb.features.includes('combo')}
                                />
                                <ServiceOption
                                    label="GridFS (Image Upload/Display)"
                                    price={PRICING.mongodb.gridfs}
                                    description="Store and serve images from MongoDB"
                                    selected={formData.services.mongodb.features.includes('gridfs') || formData.services.mongodb.features.includes('combo')}
                                    onChange={(checked) => updateMongoDB('gridfs', checked)}
                                    disabled={formData.services.mongodb.features.includes('combo')}
                                />
                                <ServiceOption
                                    label="COMBO OFFER: Both User & GridFS"
                                    price={PRICING.mongodb.combo}
                                    description="Save ₹500! Get both features together"
                                    selected={formData.services.mongodb.features.includes('combo')}
                                    onChange={(checked) => updateMongoDB('combo', checked)}
                                />
                            </div>
                        </div>

                        {/* Uropay */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Payment Integration</h3>
                            <ServiceOption
                                label="Uropay Payment Gateway"
                                price={PRICING.uropay}
                                description="Accept payments (max 200/month)"
                                selected={formData.services.uropay.included}
                                onChange={updateUropay}
                            />
                        </div>

                        {/* Price Summary */}
                        <div className="bg-gradient-to-r from-[#01b793]/20 to-[#01b793]/5 rounded-xl p-6 border border-[#01b793]/30">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[#afbfc1]">Total Price</span>
                                <span className="text-3xl font-bold text-white">₹{totalPrice.toLocaleString()}</span>
                            </div>
                            {formData.services.mongodb.features.includes('combo') && (
                                <p className="text-sm text-[#01b793]">🎉 Combo discount applied! Saving ₹500</p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 py-4 border-2 border-[#1a3a35] text-[#afbfc1] font-medium rounded-xl hover:border-[#01b793] hover:text-white transition-all"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex-1 py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-[0.98]"
                            >
                                Review Order
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Review Your Order</h2>

                        {/* Client Info Summary */}
                        <div className="bg-[#0a1f1c] rounded-xl p-6 border border-[#1a3a35]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-white">Contact Information</h3>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm text-[#01b793] hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="space-y-2 text-[#afbfc1]">
                                <p>
                                    <span className="text-white/70">Name:</span> {formData.clientName}
                                </p>
                                <p>
                                    <span className="text-white/70">Email:</span> {formData.clientEmail}
                                </p>
                                <p>
                                    <span className="text-white/70">Phone:</span> {formData.clientPhone}
                                </p>
                                {formData.businessSummary && (
                                    <div className="pt-3 mt-3 border-t border-[#1a3a35]">
                                        <p className="text-white/70 text-sm mb-1">Business Summary:</p>
                                        <p className="text-sm">{formData.businessSummary}</p>
                                    </div>
                                )}
                                {formData.additionalInfo && (
                                    <div className="pt-3 mt-3 border-t border-[#1a3a35]">
                                        <p className="text-white/70 text-sm mb-1">Additional Info:</p>
                                        <p className="text-sm">{formData.additionalInfo}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Services Summary */}
                        <div className="bg-[#0a1f1c] rounded-xl p-6 border border-[#1a3a35]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-white">Selected Services</h3>
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-sm text-[#01b793] hover:underline"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.services.frontend.tier && (
                                    <div className="flex justify-between text-[#afbfc1]">
                                        <span>Frontend: {formData.services.frontend.tier}</span>
                                        <span>₹{formData.services.frontend.price.toLocaleString()}</span>
                                    </div>
                                )}
                                {formData.services.backend.tier && (
                                    <div className="flex justify-between text-[#afbfc1]">
                                        <span>Backend: {formData.services.backend.tier}</span>
                                        <span>₹{formData.services.backend.price.toLocaleString()}</span>
                                    </div>
                                )}
                                {formData.services.mongodb.features.length > 0 && (
                                    <div className="flex justify-between text-[#afbfc1]">
                                        <span>MongoDB: {formData.services.mongodb.features.join(', ')}</span>
                                        <span>₹{formData.services.mongodb.price.toLocaleString()}</span>
                                    </div>
                                )}
                                {formData.services.uropay.included && (
                                    <div className="flex justify-between text-[#afbfc1]">
                                        <span>Uropay Integration</span>
                                        <span>₹{formData.services.uropay.price.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-[#1a3a35] flex justify-between">
                                    <span className="font-bold text-white">Total</span>
                                    <span className="font-bold text-[#01b793] text-xl">₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {submitStatus && !submitStatus.success && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                                {submitStatus.message}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(2)}
                                disabled={isSubmitting}
                                className="flex-1 py-4 border-2 border-[#1a3a35] text-[#afbfc1] font-medium rounded-xl hover:border-[#01b793] hover:text-white transition-all disabled:opacity-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Order'
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
