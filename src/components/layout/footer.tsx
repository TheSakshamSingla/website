"use client";

import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiTwitter, FiYoutube, FiInstagram, FiMail, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer link sections
  const footerLinks = [
    {
      title: "Root Things",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Modules", href: "/modules" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Forum", href: "/forum" },
        { name: "FAQ", href: "/faq" },
        { name: "Support", href: "/support" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Discord Server", href: "https://discord.gg/rootthings" },
        { name: "GitHub", href: "https://github.com/rootthings" },
        { name: "Twitter", href: "https://twitter.com/rootthings" },
        { name: "YouTube", href: "https://youtube.com/rootthings" },
        { name: "Instagram", href: "https://instagram.com/rootthings" },
      ],
    },
    {
      title: "Contribute",
      links: [
        { name: "Upload Module", href: "/upload" },
        { name: "Write a Tutorial", href: "/tutorials/create" },
        { name: "Report Bug", href: "/support/report" },
        { name: "Donate", href: "/donate" },
        { name: "Become a Partner", href: "/partners" },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    { name: "GitHub", icon: <FiGithub />, href: "https://github.com/rootthings" },
    { name: "Twitter", icon: <FiTwitter />, href: "https://twitter.com/rootthings" },
    { name: "YouTube", icon: <FiYoutube />, href: "https://youtube.com/rootthings" },
    { name: "Instagram", icon: <FiInstagram />, href: "https://instagram.com/rootthings" },
    { name: "Email", icon: <FiMail />, href: "mailto:contact@rootthings.com" },
  ];

  return (
    <footer className="bg-surface-2 border-t border-outline-variant">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Root Things Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-primary">Root Things</span>
            </Link>
            <p className="mb-4 text-on-surface-variant">
              The ultimate community for Android rooting enthusiasts. Share, discover, and learn about
              custom ROMs, kernels, and modules.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium">Subscribe to our newsletter</h3>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-lg border border-outline-variant bg-surface px-4 py-2 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Follow us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant text-on-surface-variant transition-colors hover:bg-primary hover:text-on-primary"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-lg font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-on-surface-variant transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-outline-variant bg-surface-variant py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:space-y-0 md:text-left">
            <div className="text-sm text-on-surface-variant">
              © {currentYear} Root Things. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4 text-sm text-on-surface-variant">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-on-surface-variant">
              <span>Made with</span>
              <FiHeart className="h-3 w-3 text-error" />
              <span>for the Android community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
