'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedStagger } from '@/components/AnimatedSection';

const services = [
  {
    title: 'Custom Websites',
    description: 'Beautiful, responsive websites tailored to your brand with modern design trends.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Admin Panels',
    description: 'Powerful dashboards to manage your content, users, and business operations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'User Authentication',
    description: 'Secure signup/login systems with session management and password recovery.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Payment Integration',
    description: 'Seamless payment processing with Uropay for your business transactions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    content: 'Frieren transformed our vision into a stunning website. The animations and attention to detail exceeded our expectations.',
  },
  {
    name: 'Priya Patel',
    role: 'E-commerce Owner',
    content: 'The admin panel they built is incredibly intuitive. Managing my store has never been easier.',
  },
  {
    name: 'Amit Kumar',
    role: 'Business Consultant',
    content: 'Fast delivery, beautiful design, and excellent communication throughout the project. Highly recommended!',
  },
];

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <SplashScreen onLoadComplete={() => setShowContent(true)} />}

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1c] via-[#051512] to-[#0a1f1c]" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #01b793 1px, transparent 0)`,
                  backgroundSize: '60px 60px',
                }}
              />
              {/* Gradient Orbs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#01b793]/20 rounded-full blur-[100px] animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#01b793]/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 bg-[#01b793]/10 border border-[#01b793]/30 rounded-full text-[#01b793] text-sm font-medium mb-6">
                  ✨ Premium Web Development Services
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Websites That
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#01b793] to-[#03ddb0]">
                  Drive Results
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-[#afbfc1] max-w-2xl mx-auto mb-10"
              >
                We craft stunning, high-performance websites with beautiful animations,
                secure admin panels, and seamless payment integration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/quote"
                  className="group px-8 py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-95 flex items-center gap-2"
                >
                  Get Your Quote
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 border-2 border-[#1a3a35] text-[#afbfc1] font-medium rounded-xl hover:border-[#01b793] hover:text-white transition-all"
                >
                  View Services
                </Link>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-10 border-2 border-[#afbfc1]/50 rounded-full flex items-start justify-center p-2"
                >
                  <div className="w-1.5 h-3 bg-[#01b793] rounded-full" />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 bg-[#051512]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#01b793]/10 border border-[#01b793]/30 rounded-full text-[#01b793] text-sm font-medium mb-4">
                  What We Offer
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Our Services
                </h2>
                <p className="text-[#afbfc1] max-w-2xl mx-auto">
                  From stunning frontends to powerful backends, we deliver complete web solutions.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <AnimatedSection
                    key={service.title}
                    animation="fadeUp"
                    delay={index * 0.1}
                  >
                    <div className="group h-full p-6 bg-[#0a1f1c] border border-[#1a3a35] rounded-2xl hover:border-[#01b793]/50 transition-all hover:shadow-lg hover:shadow-[#01b793]/5">
                      <div className="w-14 h-14 bg-[#01b793]/10 rounded-xl flex items-center justify-center text-[#01b793] mb-4 group-hover:bg-[#01b793] group-hover:text-white transition-all">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-[#afbfc1] text-sm">{service.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-24 bg-[#0a1f1c]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection animation="fadeLeft">
                  <span className="inline-block px-4 py-2 bg-[#01b793]/10 border border-[#01b793]/30 rounded-full text-[#01b793] text-sm font-medium mb-4">
                    Why Choose Frieren
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Quality That Speaks <br />
                    <span className="text-[#01b793]">For Itself</span>
                  </h2>
                  <p className="text-[#afbfc1] mb-8">
                    We don&apos;t just build websites – we craft digital experiences that
                    engage your audience and drive conversions. Every pixel is purposeful.
                  </p>

                  <div className="space-y-4">
                    {[
                      'Modern animations & micro-interactions',
                      'Mobile-first responsive design',
                      'SEO optimized from the ground up',
                      'Secure authentication & admin panels',
                      'Payment gateway integration',
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#01b793]/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#01b793]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeRight" delay={0.2}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#01b793]/20 to-[#01b793]/5 rounded-3xl blur-3xl" />
                    <div className="relative bg-[#051512] border border-[#1a3a35] rounded-3xl p-8">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#01b793]">50+</div>
                          <div className="text-[#afbfc1] text-sm mt-1">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#01b793]">100%</div>
                          <div className="text-[#afbfc1] text-sm mt-1">Client Satisfaction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#01b793]">24h</div>
                          <div className="text-[#afbfc1] text-sm mt-1">Response Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#01b793]">5★</div>
                          <div className="text-[#afbfc1] text-sm mt-1">Average Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 bg-[#051512]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection className="text-center mb-16">
                <span className="inline-block px-4 py-2 bg-[#01b793]/10 border border-[#01b793]/30 rounded-full text-[#01b793] text-sm font-medium mb-4">
                  Client Stories
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  What Our Clients Say
                </h2>
              </AnimatedSection>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <AnimatedSection
                    key={testimonial.name}
                    animation="fadeUp"
                    delay={index * 0.1}
                  >
                    <div className="h-full p-6 bg-[#0a1f1c] border border-[#1a3a35] rounded-2xl">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-[#01b793]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[#afbfc1] mb-4">&quot;{testimonial.content}&quot;</p>
                      <div>
                        <div className="text-white font-medium">{testimonial.name}</div>
                        <div className="text-[#afbfc1] text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-[#0a1f1c]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Ready to Build Your Dream Website?
                </h2>
                <p className="text-[#afbfc1] mb-8 max-w-2xl mx-auto">
                  Get a custom quote in minutes. No hidden fees, transparent pricing,
                  and a website that truly represents your brand.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#01b793] text-white font-medium rounded-xl hover:bg-[#00a583] transition-all hover:shadow-lg hover:shadow-[#01b793]/25 active:scale-95"
                >
                  Get Started Today
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </AnimatedSection>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 bg-[#051512] border-t border-[#1a3a35]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 group">
                  <div className="relative w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Image
                      src="/logo.png"
                      alt="Frieren Logo"
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                  <span className="font-bold text-white">Frieren</span>
                </div>
                <div className="flex items-center gap-6 text-[#afbfc1] text-sm">
                  <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                  <Link href="/about" className="hover:text-white transition-colors">About</Link>
                  <Link href="/quote" className="hover:text-white transition-colors">Contact</Link>
                </div>
                <p className="text-[#afbfc1] text-sm">
                  © {new Date().getFullYear()} Frieren. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </>
  );
}
