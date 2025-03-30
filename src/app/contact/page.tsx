"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMessageSquare, FiMapPin, FiGithub, FiTwitter, FiSend } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // In a real app, this would be an API call
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Have questions, suggestions, or need help with your rooted Android device?
              We're here to help! Get in touch with the Root Things team.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8 md:col-span-1"
            >
              <div className="rounded-lg bg-surface-variant p-6">
                <h2 className="mb-6 text-xl font-bold">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                      <FiMail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href="mailto:contact@rootthings.com"
                        className="text-primary hover:underline"
                      >
                        contact@rootthings.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                      <FiMessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Discord</h3>
                      <a
                        href="https://discord.gg/rootthings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        discord.gg/rootthings
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                      <FiGithub className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">GitHub</h3>
                      <a
                        href="https://github.com/rootthings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        github.com/rootthings
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                      <FiTwitter className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Twitter</h3>
                      <a
                        href="https://twitter.com/rootthings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @rootthings
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-surface-variant p-6">
                <h2 className="mb-4 text-xl font-bold">Office Hours</h2>
                <p className="mb-4 text-on-surface-variant">
                  Our support team is available during the following hours:
                </p>
                <ul className="space-y-2 text-on-surface">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="card">
                <h2 className="mb-6 text-xl font-bold">Send Us a Message</h2>
                
                {submitSuccess ? (
                  <div className="rounded-lg bg-success-container p-6 text-on-success-container">
                    <h3 className="mb-2 text-lg font-medium">Message Sent Successfully!</h3>
                    <p className="mb-4">
                      Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="rounded-lg bg-success px-4 py-2 font-medium text-on-success"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="rounded-lg bg-error-container p-4 text-on-error-container">
                        {submitError}
                      </div>
                    )}
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1 block font-medium">
                          Your Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="mb-1 block font-medium">
                          Your Email <span className="text-error">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="mb-1 block font-medium">
                        Subject <span className="text-error">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="bug">Bug Report</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="mb-1 block font-medium">
                        Message <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary flex items-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-outline-variant p-6">
                <h3 className="mb-3 text-lg font-medium">How long does it take to get a response?</h3>
                <p className="text-on-surface-variant">
                  We typically respond to inquiries within 24-48 hours during business days. For urgent matters,
                  please reach out to us on Discord for faster assistance.
                </p>
              </div>
              
              <div className="rounded-lg border border-outline-variant p-6">
                <h3 className="mb-3 text-lg font-medium">Do you offer technical support for all modules?</h3>
                <p className="text-on-surface-variant">
                  While we provide general guidance, specific technical support for modules is typically handled
                  by their respective developers. We can help direct you to the right resources.
                </p>
              </div>
              
              <div className="rounded-lg border border-outline-variant p-6">
                <h3 className="mb-3 text-lg font-medium">How can I report a security vulnerability?</h3>
                <p className="text-on-surface-variant">
                  For security vulnerabilities, please email security@rootthings.com with details. We take security
                  seriously and will address your concerns promptly and confidentially.
                </p>
              </div>
              
              <div className="rounded-lg border border-outline-variant p-6">
                <h3 className="mb-3 text-lg font-medium">Can I contribute to Root Things?</h3>
                <p className="text-on-surface-variant">
                  Absolutely! We welcome contributions from the community. You can contribute by uploading modules,
                  writing tutorials, or even helping with the platform's development on GitHub.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
