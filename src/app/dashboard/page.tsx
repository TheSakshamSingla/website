"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUpload, FiDownload, FiHeart, FiEdit, FiSettings, FiUser, FiPackage, FiActivity, FiMessageSquare } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

// Types
type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  joinedDate: string;
  uploads: number;
  downloads: number;
  favorites: number;
  reputation: number;
};

type ModuleItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "module" | "script" | "kernel";
  downloads: number;
  createdAt: string;
  updatedAt: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"uploads" | "downloads" | "favorites">("uploads");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/dashboard");
    }
  }, [status, router]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (status !== "authenticated") return;
      
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // await fetch("/api/user/profile")
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUserProfile: UserProfile = {
          id: "123",
          name: session?.user?.name || "User",
          email: session?.user?.email || "user@example.com",
          image: session?.user?.image || "/images/default-avatar.jpg",
          bio: "Android enthusiast and developer. I love creating custom ROMs and modules for the community.",
          joinedDate: "2025-01-15",
          uploads: 12,
          downloads: 87,
          favorites: 24,
          reputation: 156,
        };
        
        setUserProfile(mockUserProfile);
        
        // Mock modules data based on active tab
        const mockModules: ModuleItem[] = [
          {
            id: "1",
            name: "Battery Optimizer Pro",
            description: "Extend your battery life by up to 40% with this advanced optimization module.",
            image: "/images/module-2.jpg",
            type: "module",
            downloads: 8753,
            createdAt: "2025-02-15T10:30:00Z",
            updatedAt: "2025-03-10T14:25:00Z",
          },
          {
            id: "2",
            name: "Dark Mode Everywhere",
            description: "Force dark mode on all apps, even those that don't natively support it.",
            image: "/images/module-4.jpg",
            type: "module",
            downloads: 9876,
            createdAt: "2025-02-28T08:20:00Z",
            updatedAt: "2025-03-15T09:30:00Z",
          },
          {
            id: "3",
            name: "Custom Navigation Gestures",
            description: "Customize navigation gestures and add new functionality to your device.",
            image: "/images/module-6.jpg",
            type: "module",
            downloads: 6543,
            createdAt: "2025-03-15T11:45:00Z",
            updatedAt: "2025-03-20T16:10:00Z",
          },
        ];
        
        setModules(mockModules);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [status, session, activeTab]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (status === "loading" || isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="mb-8 flex flex-col items-center md:flex-row md:items-start">
              <div className="mb-4 h-32 w-32 rounded-full bg-surface-variant md:mb-0 md:mr-8"></div>
              <div className="w-full space-y-4 text-center md:text-left">
                <div className="h-8 w-48 rounded bg-surface-variant"></div>
                <div className="h-4 w-full rounded bg-surface-variant"></div>
                <div className="h-4 w-3/4 rounded bg-surface-variant"></div>
                <div className="flex justify-center space-x-4 md:justify-start">
                  <div className="h-10 w-24 rounded bg-surface-variant"></div>
                  <div className="h-10 w-24 rounded bg-surface-variant"></div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 h-12 w-full rounded bg-surface-variant"></div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-outline-variant p-4">
                  <div className="mb-4 h-48 w-full rounded bg-surface-variant"></div>
                  <div className="mb-2 h-6 w-3/4 rounded bg-surface-variant"></div>
                  <div className="mb-4 h-4 w-full rounded bg-surface-variant"></div>
                  <div className="flex justify-between">
                    <div className="h-6 w-24 rounded bg-surface-variant"></div>
                    <div className="h-6 w-16 rounded bg-surface-variant"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!session) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold">Authentication Required</h1>
          <p className="mb-6">Please log in to access your dashboard.</p>
          <Link href="/auth/login?callbackUrl=/dashboard" className="btn-primary">
            Log In
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          {/* User Profile Header */}
          {userProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex flex-col items-center md:flex-row md:items-start"
            >
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary">
                  <Image
                    src={userProfile.image}
                    alt={userProfile.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full text-center md:text-left">
                <h1 className="mb-2 text-3xl font-bold">{userProfile.name}</h1>
                <p className="mb-4 text-on-surface-variant">{userProfile.bio}</p>
                
                <div className="mb-6 flex flex-wrap justify-center gap-4 md:justify-start">
                  <div className="flex items-center space-x-2 rounded-lg bg-surface-variant px-3 py-2 text-on-surface-variant">
                    <FiPackage className="h-5 w-5" />
                    <div>
                      <span className="block font-medium">{userProfile.uploads}</span>
                      <span className="text-sm">Uploads</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-lg bg-surface-variant px-3 py-2 text-on-surface-variant">
                    <FiDownload className="h-5 w-5" />
                    <div>
                      <span className="block font-medium">{userProfile.downloads}</span>
                      <span className="text-sm">Downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-lg bg-surface-variant px-3 py-2 text-on-surface-variant">
                    <FiHeart className="h-5 w-5" />
                    <div>
                      <span className="block font-medium">{userProfile.favorites}</span>
                      <span className="text-sm">Favorites</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-lg bg-surface-variant px-3 py-2 text-on-surface-variant">
                    <FiActivity className="h-5 w-5" />
                    <div>
                      <span className="block font-medium">{userProfile.reputation}</span>
                      <span className="text-sm">Reputation</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                  <Link href="/profile/edit" className="btn-outline flex items-center">
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </Link>
                  
                  <Link href="/settings" className="btn-outline flex items-center">
                    <FiSettings className="mr-2" />
                    Settings
                  </Link>
                </div>
                
                <div className="mt-4 text-sm text-on-surface-variant">
                  <p>Member since {formatDate(userProfile.joinedDate)}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dashboard Tabs */}
          <div className="mb-8 border-b border-outline-variant">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("uploads")}
                className={`border-b-2 pb-4 font-medium ${
                  activeTab === "uploads"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <div className="flex items-center">
                  <FiUpload className="mr-2" />
                  My Uploads
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab("downloads")}
                className={`border-b-2 pb-4 font-medium ${
                  activeTab === "downloads"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <div className="flex items-center">
                  <FiDownload className="mr-2" />
                  Downloaded
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab("favorites")}
                className={`border-b-2 pb-4 font-medium ${
                  activeTab === "favorites"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <div className="flex items-center">
                  <FiHeart className="mr-2" />
                  Favorites
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* Header with action button */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {activeTab === "uploads"
                  ? "My Uploads"
                  : activeTab === "downloads"
                  ? "Downloaded Modules"
                  : "Favorite Modules"}
              </h2>
              
              {activeTab === "uploads" && (
                <Link href="/upload" className="btn-primary flex items-center">
                  <FiUpload className="mr-2" />
                  Upload New
                </Link>
              )}
            </div>
            
            {/* Modules Grid */}
            {modules.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card group overflow-hidden transition-all duration-300 hover:md-elevation-2"
                  >
                    <Link href={`/modules/${module.id}`}>
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={module.image}
                          alt={module.name}
                          width={400}
                          height={225}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 rounded-full bg-surface/90 px-2 py-1 text-xs font-medium text-on-surface">
                          {module.type.charAt(0).toUpperCase() + module.type.slice(1)}
                        </div>
                      </div>
                      
                      <h3 className="mb-2 text-xl font-bold group-hover:text-primary">{module.name}</h3>
                      <p className="mb-4 text-on-surface-variant line-clamp-2">{module.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-on-surface-variant">
                          <FiDownload className="h-4 w-4" />
                          <span>{module.downloads.toLocaleString()}</span>
                        </div>
                        
                        <div className="text-sm text-on-surface-variant">
                          {activeTab === "uploads" ? "Uploaded" : activeTab === "downloads" ? "Downloaded" : "Added"} on{" "}
                          {formatDate(activeTab === "uploads" ? module.createdAt : module.updatedAt)}
                        </div>
                      </div>
                    </Link>
                    
                    {activeTab === "uploads" && (
                      <div className="mt-4 flex justify-end space-x-2 border-t border-outline-variant pt-4">
                        <Link
                          href={`/modules/${module.id}/edit`}
                          className="rounded-lg bg-surface-variant px-3 py-1 text-sm text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/modules/${module.id}/stats`}
                          className="rounded-lg bg-surface-variant px-3 py-1 text-sm text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
                        >
                          Stats
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-surface-variant p-12 text-center">
                {activeTab === "uploads" ? (
                  <>
                    <FiUpload className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                    <h3 className="mb-2 text-xl font-medium">No uploads yet</h3>
                    <p className="mb-6 text-on-surface-variant">
                      You haven't uploaded any modules, scripts, or kernels yet.
                    </p>
                    <Link href="/upload" className="btn-primary">
                      Upload Your First Module
                    </Link>
                  </>
                ) : activeTab === "downloads" ? (
                  <>
                    <FiDownload className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                    <h3 className="mb-2 text-xl font-medium">No downloads yet</h3>
                    <p className="mb-6 text-on-surface-variant">
                      You haven't downloaded any modules, scripts, or kernels yet.
                    </p>
                    <Link href="/modules" className="btn-primary">
                      Browse Modules
                    </Link>
                  </>
                ) : (
                  <>
                    <FiHeart className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                    <h3 className="mb-2 text-xl font-medium">No favorites yet</h3>
                    <p className="mb-6 text-on-surface-variant">
                      You haven't added any modules, scripts, or kernels to your favorites yet.
                    </p>
                    <Link href="/modules" className="btn-primary">
                      Browse Modules
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
