"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiShield, FiUser, FiDatabase, FiLock, FiEye, FiTrash2 } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <FiShield className="h-6 w-6" />,
      content: `
        <p>At Root Things, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>
        <p>Please read this Privacy Policy carefully to understand our practices regarding your personal data. By using our services, you acknowledge that you have read and understood this Privacy Policy.</p>
        <p>This Privacy Policy was last updated on June 1, 2023.</p>
      `,
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <FiDatabase className="h-6 w-6" />,
      content: `
        <p>We collect several types of information from and about users of our website, including:</p>
        <h3>Personal Data</h3>
        <ul>
          <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, username, and password.</li>
          <li><strong>Profile Information:</strong> Information you provide in your user profile, such as profile picture, bio, and social media links.</li>
          <li><strong>Content:</strong> Information you provide when uploading modules, posting in forums, or submitting reviews.</li>
          <li><strong>Communications:</strong> Records of your communications with us, including support requests and feedback.</li>
        </ul>
        <h3>Automatically Collected Information</h3>
        <ul>
          <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and features used.</li>
          <li><strong>Device Information:</strong> Information about your device, including IP address, browser type, operating system, and device identifiers.</li>
          <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies and similar tracking technologies.</li>
        </ul>
      `,
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: <FiUser className="h-6 w-6" />,
      content: `
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li><strong>Providing Services:</strong> To operate, maintain, and improve our website and services.</li>
          <li><strong>Account Management:</strong> To create and manage your account, authenticate users, and provide user support.</li>
          <li><strong>Communication:</strong> To communicate with you about your account, respond to inquiries, and send important notices.</li>
          <li><strong>Content Delivery:</strong> To deliver the content, modules, and information you request.</li>
          <li><strong>Community Features:</strong> To enable community features such as forums, reviews, and user profiles.</li>
          <li><strong>Analytics:</strong> To analyze usage patterns, troubleshoot issues, and improve our services.</li>
          <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and security breaches.</li>
          <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms of service.</li>
        </ul>
      `,
    },
    {
      id: "data-sharing",
      title: "How We Share Your Information",
      icon: <FiEye className="h-6 w-6" />,
      content: `
        <p>We may share your information in the following circumstances:</p>
        <ul>
          <li><strong>With Your Consent:</strong> When you have explicitly consented to the sharing of your information.</li>
          <li><strong>Service Providers:</strong> With third-party service providers who perform services on our behalf, such as hosting, analytics, and customer support.</li>
          <li><strong>Public Content:</strong> Information you post publicly on our website (such as forum posts, reviews, and public profile information) is visible to other users.</li>
          <li><strong>Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, where your information may be transferred as a business asset.</li>
          <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of Root Things, our users, or others.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      `,
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <FiLock className="h-6 w-6" />,
      content: `
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include:</p>
        <ul>
          <li>Encryption of sensitive data both in transit and at rest</li>
          <li>Regular security assessments and vulnerability testing</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Regular backups and disaster recovery procedures</li>
          <li>Employee training on data protection and security practices</li>
        </ul>
        <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
      `,
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: <FiDatabase className="h-6 w-6" />,
      content: `
        <p>We use cookies and similar tracking technologies to collect and track information about your interactions with our website. Cookies are small text files that are stored on your device when you visit a website.</p>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
          <li><strong>Preference Cookies:</strong> Enable the website to remember your preferences and settings.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
          <li><strong>Authentication Cookies:</strong> Recognize you when you return to our website and keep you logged in.</li>
        </ul>
        <p>You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.</p>
        <p>For more information about our use of cookies, please see our <a href="/cookies" class="text-primary hover:underline">Cookie Policy</a>.</p>
      `,
    },
    {
      id: "user-rights",
      title: "Your Privacy Rights",
      icon: <FiUser className="h-6 w-6" />,
      content: `
        <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
        <ul>
          <li><strong>Access:</strong> The right to request a copy of the personal data we hold about you.</li>
          <li><strong>Rectification:</strong> The right to request correction of inaccurate or incomplete personal data.</li>
          <li><strong>Erasure:</strong> The right to request deletion of your personal data in certain circumstances.</li>
          <li><strong>Restriction:</strong> The right to request restriction of processing of your personal data.</li>
          <li><strong>Data Portability:</strong> The right to receive your personal data in a structured, commonly used format.</li>
          <li><strong>Objection:</strong> The right to object to processing of your personal data in certain circumstances.</li>
          <li><strong>Withdraw Consent:</strong> The right to withdraw consent where processing is based on consent.</li>
        </ul>
        <p>To exercise these rights, please contact us at privacy@rootthings.com. We will respond to your request within the timeframe required by applicable law.</p>
      `,
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: <FiTrash2 className="h-6 w-6" />,
      content: `
        <p>We retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
        <p>To determine the appropriate retention period, we consider:</p>
        <ul>
          <li>The amount, nature, and sensitivity of the personal data</li>
          <li>The potential risk of harm from unauthorized use or disclosure</li>
          <li>The purposes for which we process the data</li>
          <li>Whether we can achieve those purposes through other means</li>
          <li>Legal, regulatory, and contractual requirements</li>
        </ul>
        <p>When your personal data is no longer needed, we will securely delete or anonymize it.</p>
      `,
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: <FiShield className="h-6 w-6" />,
      content: `
        <p>Our services are not intended for children under the age of 13, and we do not knowingly collect personal data from children under 13. If we learn that we have collected personal data from a child under 13, we will take steps to delete that information as quickly as possible.</p>
        <p>If you believe we might have any information from or about a child under 13, please contact us at privacy@rootthings.com.</p>
      `,
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: <FiDatabase className="h-6 w-6" />,
      content: `
        <p>We may transfer, store, and process your personal data in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.</p>
        <p>When we transfer your personal data internationally, we take appropriate safeguards to ensure that your personal data receives an adequate level of protection, including:</p>
        <ul>
          <li>Using standard contractual clauses approved by relevant authorities</li>
          <li>Ensuring that recipients are bound by data protection policies that provide adequate protection</li>
          <li>Implementing additional security measures as appropriate</li>
        </ul>
        <p>By using our services, you consent to the transfer of your personal data to countries outside your country of residence, subject to the safeguards described in this Privacy Policy.</p>
      `,
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      icon: <FiShield className="h-6 w-6" />,
      content: `
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this Privacy Policy.</p>
        <p>We encourage you to review this Privacy Policy periodically to stay informed about our data practices. If we make material changes, we will provide notice through our website or by other means, such as email.</p>
        <p>Your continued use of our services after any changes to this Privacy Policy constitutes your acceptance of the revised Privacy Policy.</p>
      `,
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: <FiUser className="h-6 w-6" />,
      content: `
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
        <p>Email: privacy@rootthings.com</p>
        <p>Postal Address: Root Things Privacy Team, 123 Tech Street, San Francisco, CA 94105, USA</p>
        <p>We are committed to addressing your concerns and resolving any issues regarding your privacy.</p>
      `,
    },
  ];

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
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
            <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Last Updated: June 1, 2023
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="mb-8 rounded-lg bg-primary-container p-6 text-on-primary-container">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <FiShield className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-bold">Your Privacy Matters</h2>
                  <p className="mb-4">
                    At Root Things, we're committed to protecting your personal information and being transparent
                    about how we use it. This Privacy Policy explains our data practices in clear, straightforward language.
                  </p>
                  <p>
                    If you have any questions after reading this policy, please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex flex-col items-center rounded-lg border border-outline-variant p-4 text-center transition-colors hover:bg-surface-variant"
                >
                  <div className="mb-2 text-primary">{section.icon}</div>
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-outline-variant p-6"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-primary">{section.icon}</div>
                      <h2 className="text-xl font-bold">{section.title}</h2>
                    </div>
                    <span className="text-2xl">
                      {activeSection === section.id ? "−" : "+"}
                    </span>
                  </button>
                  {(activeSection === section.id || activeSection === null) && (
                    <div
                      className="mt-4 prose prose-sm max-w-none text-on-surface"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-12 rounded-lg bg-surface-variant p-6">
              <h2 className="mb-4 text-xl font-bold">Have Questions About Your Privacy?</h2>
              <p className="mb-4">
                We're here to help. If you have any questions about our privacy practices or would like to
                exercise your privacy rights, please don't hesitate to reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-lg bg-primary px-6 py-2 font-medium text-on-primary hover:bg-primary/90"
                >
                  Contact Us
                </Link>
                <Link
                  href="/terms"
                  className="rounded-lg border border-outline-variant px-6 py-2 font-medium hover:bg-surface"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
