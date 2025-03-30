"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/main-layout";

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: `
        <p>Welcome to Root Things. These Terms of Service ("Terms") govern your access to and use of the Root Things website, services, and applications (collectively, the "Services").</p>
        <p>By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.</p>
        <p>Please read these Terms carefully before using our Services. If you have any questions about these Terms, please contact us at legal@rootthings.com.</p>
      `,
    },
    {
      id: "definitions",
      title: "Definitions",
      content: `
        <p>Throughout these Terms, we use certain terms with specific meanings:</p>
        <ul>
          <li><strong>"Root Things,"</strong> "we," "us," and "our" refer to the Root Things platform and its operators.</li>
          <li><strong>"User,"</strong> "you," and "your" refer to any individual or entity that accesses or uses our Services.</li>
          <li><strong>"Content"</strong> refers to any information, text, graphics, photos, videos, or other materials uploaded, downloaded, or appearing on our Services.</li>
          <li><strong>"Module"</strong> refers to any software, script, kernel, or other technical component uploaded to or downloaded from our Services.</li>
        </ul>
      `,
    },
    {
      id: "account-responsibilities",
      title: "Account Responsibilities",
      content: `
        <p>To access certain features of our Services, you may need to create an account. You are responsible for:</p>
        <ul>
          <li>Providing accurate and complete information when creating your account.</li>
          <li>Maintaining the security of your account credentials.</li>
          <li>All activities that occur under your account.</li>
          <li>Notifying us immediately of any unauthorized use of your account.</li>
        </ul>
        <p>We reserve the right to suspend or terminate your account if any information provided during the registration process or thereafter proves to be inaccurate, false, or misleading.</p>
      `,
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      content: `
        <p>You agree not to engage in any of the following prohibited activities:</p>
        <ul>
          <li>Violating any applicable laws or regulations.</li>
          <li>Infringing on the intellectual property rights of others.</li>
          <li>Uploading or distributing malware, viruses, or any malicious code.</li>
          <li>Attempting to gain unauthorized access to our systems or other users' accounts.</li>
          <li>Harassing, threatening, or intimidating other users.</li>
          <li>Using our Services to distribute spam or unsolicited communications.</li>
          <li>Interfering with or disrupting the integrity or performance of our Services.</li>
          <li>Collecting or harvesting user data without consent.</li>
        </ul>
        <p>We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates these provisions.</p>
      `,
    },
    {
      id: "content-policies",
      title: "Content Policies",
      content: `
        <p>Users may upload, post, or share Content through our Services, subject to the following conditions:</p>
        <ul>
          <li>You retain ownership of any Content you submit, but grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and distribute such Content for the purpose of providing and improving our Services.</li>
          <li>You are solely responsible for your Content and the consequences of posting it.</li>
          <li>You represent and warrant that you own or have the necessary rights to the Content you post, and that such Content does not violate the rights of any third party.</li>
          <li>We reserve the right to remove any Content that violates these Terms or that we find objectionable for any reason, without prior notice.</li>
        </ul>
      `,
    },
    {
      id: "module-policies",
      title: "Module Policies",
      content: `
        <p>For modules, scripts, kernels, and other technical components uploaded to our Services:</p>
        <ul>
          <li>You must clearly specify the license under which your module is distributed.</li>
          <li>You must provide accurate information about your module's functionality, compatibility, and potential risks.</li>
          <li>You must not upload modules that contain malware, spyware, or other harmful components.</li>
          <li>You must not upload modules that circumvent security measures for illegal purposes.</li>
          <li>You acknowledge that we may scan uploaded modules for security purposes.</li>
          <li>We do not claim ownership of your modules, but you grant us a license to store, display, and make them available to users of our Services.</li>
        </ul>
      `,
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: `
        <p>The Root Things name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Root Things or its affiliates. You may not use such marks without our prior written permission.</p>
        <p>All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of Root Things, its licensors, or other content providers.</p>
        <p>Our Services may contain third-party content or links to third-party websites. We do not endorse, control, or assume responsibility for any third-party content or websites.</p>
      `,
    },
    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      content: `
        <p>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</p>
        <p>TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        <p>WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.</p>
        <p>WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF OUR SERVICES IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY, OR OTHERWISE.</p>
      `,
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      content: `
        <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ROOT THINGS, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
        <ul>
          <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES;</li>
          <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES;</li>
          <li>ANY CONTENT OR MODULES OBTAINED FROM OUR SERVICES; AND</li>
          <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</li>
        </ul>
        <p>IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OUR SERVICES DURING THE TWELVE (12) MONTHS PRIOR TO THE CLAIM.</p>
      `,
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: `
        <p>You agree to defend, indemnify, and hold harmless Root Things, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:</p>
        <ul>
          <li>Your violation of these Terms;</li>
          <li>Your Content or modules;</li>
          <li>Your use of our Services; or</li>
          <li>Your violation of any rights of another.</li>
        </ul>
      `,
    },
    {
      id: "modifications",
      title: "Modifications to Terms",
      content: `
        <p>We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by:</p>
        <ul>
          <li>Posting the updated Terms on our website;</li>
          <li>Updating the "Last Updated" date at the top of these Terms; or</li>
          <li>Sending you an email notification.</li>
        </ul>
        <p>Your continued use of our Services after any such changes constitutes your acceptance of the new Terms. If you do not agree to the revised Terms, you must stop using our Services.</p>
      `,
    },
    {
      id: "termination",
      title: "Termination",
      content: `
        <p>We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.</p>
        <p>Upon termination, your right to use our Services will immediately cease. If you wish to terminate your account, you may simply discontinue using our Services or contact us to request account deletion.</p>
        <p>All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
      `,
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content: `
        <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
        <p>Any legal action or proceeding arising out of or relating to these Terms or your use of our Services shall be brought exclusively in the federal or state courts located in the United States, and you consent to the personal jurisdiction of such courts.</p>
      `,
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous",
      content: `
        <p><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Root Things regarding our Services and supersede any prior agreements.</p>
        <p><strong>Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision.</p>
        <p><strong>Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck, and the remaining provisions shall be enforced.</p>
        <p><strong>Assignment:</strong> You may not assign or transfer these Terms without our prior written consent, but we may assign or transfer these Terms without restriction.</p>
        <p><strong>Contact:</strong> Questions about these Terms should be sent to legal@rootthings.com.</p>
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
            <h1 className="mb-4 text-4xl font-bold">Terms of Service</h1>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Last Updated: June 1, 2023
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="mb-8 rounded-lg bg-surface-variant p-4 text-on-surface-variant">
              <p className="mb-2 font-medium">Important Notice:</p>
              <p>
                By using Root Things, you agree to these Terms of Service. Please read them carefully.
                These terms include limitations on Root Things' liability and your legal rights.
                If you do not agree with these terms, please do not use our services.
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="rounded-full bg-surface-variant px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
                >
                  {section.title}
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
                    <h2 className="text-xl font-bold">{section.title}</h2>
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

            <div className="mt-12 rounded-lg bg-primary-container p-6 text-on-primary-container">
              <h2 className="mb-4 text-xl font-bold">Questions About Our Terms?</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact our legal team.
                We're here to help clarify any concerns you might have.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-lg bg-primary px-6 py-2 font-medium text-on-primary hover:bg-primary/90"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  className="rounded-lg border border-on-primary-container px-6 py-2 font-medium text-on-primary-container hover:bg-surface-variant"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
