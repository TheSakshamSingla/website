"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUsers, FiDownload, FiPackage, FiCode, FiHeart, FiShield } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

export default function AboutPage() {
  // Team members
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & Lead Developer",
      image: "/images/avatar-3.jpg",
      bio: "Android enthusiast and developer with over 10 years of experience in custom ROM development.",
    },
    {
      name: "Sarah Williams",
      role: "Community Manager",
      image: "/images/avatar-4.jpg",
      bio: "Passionate about building communities and helping users get the most out of their devices.",
    },
    {
      name: "Michael Brown",
      role: "Security Specialist",
      image: "/images/avatar-5.jpg",
      bio: "Focused on ensuring that all modules on the platform meet strict security standards.",
    },
    {
      name: "Emily Davis",
      role: "UI/UX Designer",
      image: "/images/avatar-6.jpg",
      bio: "Creating beautiful and intuitive interfaces that make rooting accessible to everyone.",
    },
  ];

  // Stats
  const stats = [
    { label: "Active Users", value: "15K+", icon: <FiUsers className="h-6 w-6" /> },
    { label: "Downloads", value: "1.2M+", icon: <FiDownload className="h-6 w-6" /> },
    { label: "Modules", value: "500+", icon: <FiPackage className="h-6 w-6" /> },
    { label: "Contributors", value: "120+", icon: <FiCode className="h-6 w-6" /> },
  ];

  // Values
  const values = [
    {
      title: "Community First",
      description: "We believe in the power of community collaboration and knowledge sharing.",
      icon: <FiUsers className="h-10 w-10" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Open Source",
      description: "We're committed to open source principles and transparent development.",
      icon: <FiCode className="h-10 w-10" />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "User Privacy",
      description: "We respect user privacy and never collect unnecessary personal data.",
      icon: <FiShield className="h-10 w-10" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Quality Content",
      description: "We maintain high standards for all modules and content on our platform.",
      icon: <FiHeart className="h-10 w-10" />,
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Root Things</h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-on-surface-variant">
              We're a community-driven platform dedicated to Android rooting enthusiasts,
              developers, and users looking to get the most out of their devices.
            </p>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-lg">
              <Image
                src="/images/about-hero.jpg"
                alt="Root Things Team"
                width={1200}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
                <div className="space-y-4 text-on-surface">
                  <p>
                    Root Things began in 2023 as a small forum for Android enthusiasts to share their custom
                    modules and scripts. What started as a passion project quickly grew into a thriving
                    community of developers and users.
                  </p>
                  <p>
                    As the community expanded, we recognized the need for a dedicated platform where users
                    could safely discover, download, and share Android rooting modules, scripts, and
                    kernels. This led to the creation of Root Things as it exists today.
                  </p>
                  <p>
                    Our mission is to make Android customization accessible to everyone while maintaining
                    high standards for security and quality. We believe in the power of open source
                    development and community collaboration.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/about-1.jpg"
                    alt="Root Things Community"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/about-2.jpg"
                    alt="Android Development"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/about-3.jpg"
                    alt="Team Collaboration"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/about-4.jpg"
                    alt="User Community"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 rounded-lg bg-surface-variant p-8"
          >
            <h2 className="mb-8 text-center text-3xl font-bold">Root Things by the Numbers</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 rounded-full bg-surface p-4 text-primary md-elevation-1">
                    {stat.icon}
                  </div>
                  <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                  <div className="text-on-surface-variant">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-lg border border-outline-variant p-6 text-center"
                >
                  <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${value.color}`}>
                    {value.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                  <p className="text-on-surface-variant">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="mb-8 text-center text-3xl font-bold">Meet Our Team</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card overflow-hidden text-center"
                >
                  <div className="mb-4 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="mx-auto h-32 w-32 object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                  <p className="mb-3 text-primary">{member.role}</p>
                  <p className="text-on-surface-variant">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Join Us */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-primary-container p-8 text-center text-on-primary-container"
          >
            <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
            <p className="mx-auto mb-6 max-w-2xl text-lg">
              Whether you're a developer, enthusiast, or just getting started with Android rooting,
              there's a place for you in our community. Join us today and be part of the Root Things family!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="btn-primary">
                Create an Account
              </Link>
              <Link href="/forum" className="btn-outline">
                Visit Our Forum
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
