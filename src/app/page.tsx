import Image from "next/image";
import Link from "next/link";
import { FiDownload, FiUsers, FiLayers, FiShield } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-tertiary opacity-20" />
          <div className="absolute h-full w-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-30" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-6 inline-block rounded-full bg-primary-container px-4 py-1 text-sm font-medium text-on-primary-container"
            >
              The Ultimate Android Rooting Community
            </motion.div>
            
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
            >
              Unlock the Full Potential of Your <span className="text-primary">Android Device</span>
            </motion.h1>
            
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-10 max-w-2xl text-on-surface-variant md:text-lg"
            >
              Join our community of Android enthusiasts and developers to discover, share, and download the latest rooting modules, scripts, and kernels.
            </motion.p>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <motion.div variants={fadeInUp}>
                <Link href="/modules" className="btn-primary flex items-center justify-center space-x-2">
                  <FiDownload className="h-5 w-5" />
                  <span>Explore Modules</span>
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp}>
                <Link href="/community" className="btn-secondary flex items-center justify-center space-x-2">
                  <FiUsers className="h-5 w-5" />
                  <span>Join Community</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Modules Section */}
      <section className="bg-surface py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Featured Modules</h2>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Discover the most popular and powerful rooting modules for your Android device.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group transition-all duration-300 hover:md-elevation-3"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={module.image}
                    alt={module.title}
                    width={400}
                    height={225}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{module.title}</h3>
                <p className="mb-4 text-on-surface-variant">{module.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={module.author.avatar}
                        alt={module.author.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-on-surface-variant">{module.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-on-surface-variant">
                    <FiDownload className="h-4 w-4" />
                    <span>{module.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/modules" className="btn-text">
              View All Modules
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface-variant py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Root Things?</h2>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Our platform offers everything you need to enhance your Android experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl bg-surface p-6 md-elevation-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-container">
                  <feature.icon className="h-6 w-6 text-on-primary-container" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-on-surface-variant">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 text-3xl font-bold text-on-primary md:text-4xl">
              Ready to unlock your device's full potential?
            </h2>
            <p className="mb-10 max-w-2xl text-on-primary/90 md:text-lg">
              Join our community today and get access to exclusive modules, scripts, and support from experienced Android enthusiasts.
            </p>
            <Link href="/auth/signup" className="rounded-full bg-on-primary px-8 py-3 font-medium text-primary transition-all duration-300 hover:bg-opacity-90">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

// Sample data
const featuredModules = [
  {
    id: 1,
    title: "Magisk Module Collection",
    description: "A comprehensive collection of the most popular Magisk modules for enhanced functionality.",
    image: "/images/module-1.jpg",
    author: {
      name: "John Doe",
      avatar: "/images/avatar-1.jpg"
    },
    downloads: 15420
  },
  {
    id: 2,
    title: "Battery Optimizer Pro",
    description: "Extend your battery life by up to 40% with this advanced optimization module.",
    image: "/images/module-2.jpg",
    author: {
      name: "Jane Smith",
      avatar: "/images/avatar-2.jpg"
    },
    downloads: 8753
  },
  {
    id: 3,
    title: "Performance Booster",
    description: "Unlock hidden performance settings and boost your device's speed significantly.",
    image: "/images/module-3.jpg",
    author: {
      name: "Alex Johnson",
      avatar: "/images/avatar-3.jpg"
    },
    downloads: 12089
  }
];

const features = [
  {
    icon: FiDownload,
    title: "Vast Module Library",
    description: "Access thousands of modules, scripts, and kernels for various Android devices and versions."
  },
  {
    icon: FiUsers,
    title: "Active Community",
    description: "Join a thriving community of Android enthusiasts sharing knowledge and providing support."
  },
  {
    icon: FiLayers,
    title: "Organized Categories",
    description: "Find exactly what you need with our well-organized categories and powerful search functionality."
  },
  {
    icon: FiShield,
    title: "Security First",
    description: "All uploads are verified and scanned to ensure they're safe for your device."
  },
  {
    title: "Regular Updates",
    icon: FiDownload,
    description: "Stay up-to-date with the latest Android rooting techniques and tools."
  },
  {
    title: "Detailed Documentation",
    icon: FiLayers,
    description: "Comprehensive guides and documentation for all skill levels."
  }
];
