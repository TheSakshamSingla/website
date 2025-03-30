"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FiDownload, 
  FiHeart, 
  FiShare2, 
  FiMessageSquare, 
  FiStar, 
  FiClock,
  FiUser,
  FiChevronLeft,
  FiThumbsUp,
  FiThumbsDown,
  FiBookmark
} from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

// Types
type Module = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  type: "module" | "script" | "kernel";
  category: string;
  downloads: number;
  version: string;
  lastUpdated: string;
  createdAt: string;
  tags: string[];
  requirements: string[];
  compatibility: string[];
  fileSize: string;
  rating: number;
  reviews: Review[];
};

type Review = {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  dislikes: number;
};

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [isLoading, setIsLoading] = useState(true);
  const [module, setModule] = useState<Module | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "compatibility">("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch module data
  useEffect(() => {
    const fetchModuleData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // await fetch(`/api/files/${id}`)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on the ID
        const mockModule: Module = {
          id: id as string,
          name: id === "1" ? "Magisk Module Collection" : 
                id === "2" ? "Battery Optimizer Pro" : 
                id === "3" ? "Performance Booster" : 
                id === "4" ? "Dark Mode Everywhere" : 
                id === "5" ? "Advanced Privacy Guard" : "Custom Navigation Gestures",
          description: id === "1" ? "A comprehensive collection of the most popular Magisk modules for enhanced functionality." :
                      id === "2" ? "Extend your battery life by up to 40% with this advanced optimization module." :
                      id === "3" ? "Unlock hidden performance settings and boost your device's speed significantly." :
                      id === "4" ? "Force dark mode on all apps, even those that don't natively support it." :
                      id === "5" ? "Protect your privacy with advanced permission controls and tracking prevention." :
                      "Customize navigation gestures and add new functionality to your device.",
          longDescription: `This powerful module provides extensive customization options for your rooted Android device. 
                          It leverages root access to modify system parameters that are normally inaccessible, 
                          allowing for significant improvements in functionality and performance.
                          
                          The module is designed with user experience in mind, featuring an intuitive interface 
                          that makes it easy to apply changes and revert them if necessary. All modifications 
                          are made in a non-destructive manner, ensuring the stability of your device.
                          
                          Regular updates ensure compatibility with the latest Android versions and devices.`,
          image: `/images/module-${id}.jpg`,
          screenshots: [
            `/images/screenshot-${id}-1.jpg`,
            `/images/screenshot-${id}-2.jpg`,
            `/images/screenshot-${id}-3.jpg`,
            `/images/screenshot-${id}-4.jpg`,
          ],
          author: {
            id: `10${id}`,
            name: id === "1" ? "John Doe" : 
                  id === "2" ? "Jane Smith" : 
                  id === "3" ? "Alex Johnson" : 
                  id === "4" ? "Sarah Williams" : 
                  id === "5" ? "Michael Brown" : "Emily Davis",
            avatar: `/images/avatar-${id}.jpg`
          },
          type: "module",
          category: id === "1" ? "system" : 
                   id === "2" ? "battery" : 
                   id === "3" ? "performance" : 
                   id === "4" ? "ui" : 
                   id === "5" ? "security" : "customization",
          downloads: id === "1" ? 15420 : 
                     id === "2" ? 8753 : 
                     id === "3" ? 12089 : 
                     id === "4" ? 9876 : 
                     id === "5" ? 7654 : 6543,
          version: "2.1.0",
          lastUpdated: "2025-03-15",
          createdAt: id === "1" ? "2025-03-05T09:15:00Z" : 
                     id === "2" ? "2025-02-15T10:30:00Z" : 
                     id === "3" ? "2025-01-20T14:45:00Z" : 
                     id === "4" ? "2025-02-28T08:20:00Z" : 
                     id === "5" ? "2025-03-10T16:30:00Z" : "2025-03-15T11:45:00Z",
          tags: id === "1" ? ["magisk", "system", "root"] : 
                id === "2" ? ["battery", "optimization", "power"] : 
                id === "3" ? ["performance", "speed", "optimization"] : 
                id === "4" ? ["dark mode", "ui", "theme"] : 
                id === "5" ? ["privacy", "security", "permissions"] : 
                ["gestures", "navigation", "customization"],
          requirements: [
            "Android 10.0+",
            "Magisk 24.0+",
            "Root access"
          ],
          compatibility: [
            "Samsung Galaxy S21/S22/S23 series",
            "Google Pixel 6/7/8 series",
            "OnePlus 9/10/11 series",
            "Xiaomi 12/13 series"
          ],
          fileSize: "4.2 MB",
          rating: 4.7,
          reviews: [
            {
              id: "r1",
              user: {
                id: "u1",
                name: "Alex Thompson",
                avatar: "/images/review-avatar-1.jpg"
              },
              rating: 5,
              comment: "This module is absolutely fantastic! It improved my device's performance significantly and was very easy to install.",
              date: "2025-03-10",
              likes: 24,
              dislikes: 2
            },
            {
              id: "r2",
              user: {
                id: "u2",
                name: "Maria Garcia",
                avatar: "/images/review-avatar-2.jpg"
              },
              rating: 4,
              comment: "Works great on my Pixel 7. The only reason I'm giving 4 stars instead of 5 is because it took a couple of tries to get it working properly.",
              date: "2025-03-05",
              likes: 15,
              dislikes: 1
            },
            {
              id: "r3",
              user: {
                id: "u3",
                name: "David Kim",
                avatar: "/images/review-avatar-3.jpg"
              },
              rating: 5,
              comment: "Best module I've used so far. The developer is also very responsive to questions and feedback.",
              date: "2025-02-28",
              likes: 19,
              dislikes: 0
            }
          ]
        };
        
        setModule(mockModule);
      } catch (error) {
        console.error("Error fetching module:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchModuleData();
    }
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would make an API call to update the user's favorites
  };

  // Handle download
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/files/download/${id}`)
      
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success message or redirect would happen here
      console.log("Download successful");
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle review like/dislike
  const handleReviewReaction = (reviewId: string, isLike: boolean) => {
    if (!module) return;
    
    setModule({
      ...module,
      reviews: module.reviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            likes: isLike ? review.likes + 1 : review.likes,
            dislikes: !isLike ? review.dislikes + 1 : review.dislikes
          };
        }
        return review;
      })
    });
    
    // In a real app, this would make an API call to update the review reactions
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="mb-4 h-8 w-48 rounded bg-surface-variant"></div>
            <div className="mb-8 h-12 w-3/4 rounded bg-surface-variant"></div>
            <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="h-96 rounded-lg bg-surface-variant"></div>
              <div className="space-y-4">
                <div className="h-8 w-full rounded bg-surface-variant"></div>
                <div className="h-24 w-full rounded bg-surface-variant"></div>
                <div className="h-10 w-48 rounded bg-surface-variant"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!module) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Module Not Found</h2>
          <p className="mb-6">The module you're looking for doesn't exist or has been removed.</p>
          <Link href="/modules" className="btn-primary">
            Back to Modules
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <button 
              onClick={() => router.back()} 
              className="mb-4 flex items-center text-primary hover:text-primary/80"
            >
              <FiChevronLeft className="mr-1" />
              Back to Modules
            </button>
            
            <nav className="flex">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-on-surface-variant hover:text-primary">
                    Home
                  </Link>
                </li>
                <li className="text-on-surface-variant">/</li>
                <li>
                  <Link href="/modules" className="text-on-surface-variant hover:text-primary">
                    Modules
                  </Link>
                </li>
                <li className="text-on-surface-variant">/</li>
                <li className="font-medium text-primary">{module.name}</li>
              </ol>
            </nav>
          </div>

          {/* Module Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {/* Module Image and Screenshots */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={module.screenshots[selectedScreenshot] || module.image}
                  alt={module.name}
                  width={800}
                  height={450}
                  className="h-auto w-full object-cover"
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {module.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScreenshot(index)}
                    className={`flex-shrink-0 overflow-hidden rounded-md ${
                      selectedScreenshot === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      width={100}
                      height={60}
                      className="h-16 w-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Module Info */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-2 text-3xl font-bold">{module.name}</h1>
                <p className="text-on-surface-variant">{module.description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(module.rating)}
                  <span className="ml-2 text-on-surface-variant">
                    {module.rating} ({module.reviews.length} reviews)
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-on-surface-variant">
                  <FiDownload className="h-4 w-4" />
                  <span>{module.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {module.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-variant px-3 py-1 text-sm text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={module.author.avatar}
                      alt={module.author.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{module.author.name}</p>
                    <Link 
                      href={`/profile/${module.author.id}`}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-on-surface-variant">Version</p>
                  <p className="font-medium">{module.version}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant">Last Updated</p>
                  <p className="font-medium">{formatDate(module.lastUpdated)}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant">File Size</p>
                  <p className="font-medium">{module.fileSize}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant">Category</p>
                  <p className="font-medium capitalize">{module.category}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="btn-primary flex items-center"
                >
                  {isDownloading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <FiDownload className="mr-2" />
                      Download
                    </>
                  )}
                </button>
                
                <button
                  onClick={toggleFavorite}
                  className={`btn-outline flex items-center ${
                    isFavorite ? "border-primary text-primary" : ""
                  }`}
                >
                  <FiHeart
                    className={`mr-2 ${isFavorite ? "fill-current" : ""}`}
                  />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </button>
                
                <button className="btn-outline flex items-center">
                  <FiShare2 className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="mb-8 border-b border-outline-variant">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`border-b-2 pb-4 font-medium ${
                  activeTab === "description"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Description
              </button>
              
              <button
                onClick={() => setActiveTab("compatibility")}
                className={`border-b-2 pb-4 font-medium ${
                  activeTab === "compatibility"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Compatibility
              </button>
              
              <button
                onClick={() => setActiveTab("reviews")}
                className={`border-b-2 pb-4 font-medium ${
                  activeTab === "reviews"
                    ? "border-primary text-primary"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Reviews ({module.reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {/* Description Tab */}
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="prose prose-lg max-w-none text-on-surface">
                  <h3>About this Module</h3>
                  <p>{module.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="mb-4 text-xl font-medium">Requirements</h3>
                  <ul className="list-inside list-disc space-y-2 text-on-surface">
                    {module.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="mb-4 text-xl font-medium">Installation Instructions</h3>
                  <ol className="list-inside list-decimal space-y-3 text-on-surface">
                    <li>Download the module ZIP file</li>
                    <li>Open Magisk Manager on your device</li>
                    <li>Tap on the Modules section</li>
                    <li>Select "Install from storage"</li>
                    <li>Navigate to the downloaded ZIP file and select it</li>
                    <li>Wait for the installation to complete</li>
                    <li>Reboot your device when prompted</li>
                  </ol>
                </div>
              </motion.div>
            )}
            
            {/* Compatibility Tab */}
            {activeTab === "compatibility" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="mb-4 text-xl font-medium">Compatible Devices</h3>
                  <ul className="list-inside list-disc space-y-2 text-on-surface">
                    {module.compatibility.map((device, index) => (
                      <li key={index}>{device}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-on-surface-variant">
                    Note: This module may work on other devices not listed here, but has been thoroughly tested on the devices above.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-4 text-xl font-medium">Known Issues</h3>
                  <ul className="list-inside list-disc space-y-2 text-on-surface">
                    <li>May cause battery drain on some devices when specific features are enabled</li>
                    <li>Potential conflicts with similar modules that modify the same system components</li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-surface-variant p-4">
                  <h4 className="mb-2 font-medium">Compatibility Report</h4>
                  <p className="text-on-surface-variant">
                    If you encounter any issues with this module on your device, please report them to the developer through the feedback form or GitHub issues.
                  </p>
                </div>
              </motion.div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium">User Reviews</h3>
                    <p className="text-on-surface-variant">
                      {module.reviews.length} reviews for this module
                    </p>
                  </div>
                  
                  <button className="btn-primary">Write a Review</button>
                </div>
                
                <div className="space-y-6">
                  {module.reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border border-outline-variant p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={review.user.avatar}
                              alt={review.user.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{review.user.name}</p>
                            <div className="flex items-center space-x-2">
                              {renderStars(review.rating)}
                              <span className="text-sm text-on-surface-variant">
                                {formatDate(review.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="mb-4 text-on-surface">{review.comment}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          onClick={() => handleReviewReaction(review.id, true)}
                          className="flex items-center space-x-1 text-on-surface-variant hover:text-primary"
                        >
                          <FiThumbsUp className="h-4 w-4" />
                          <span>{review.likes}</span>
                        </button>
                        
                        <button
                          onClick={() => handleReviewReaction(review.id, false)}
                          className="flex items-center space-x-1 text-on-surface-variant hover:text-error"
                        >
                          <FiThumbsDown className="h-4 w-4" />
                          <span>{review.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Related Modules */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Related Modules</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((relatedId) => (
                <Link
                  key={relatedId}
                  href={`/modules/${relatedId}`}
                  className="group rounded-lg border border-outline-variant p-4 transition-all duration-300 hover:border-primary hover:md-elevation-1"
                >
                  <div className="mb-3 overflow-hidden rounded">
                    <Image
                      src={`/images/module-${relatedId}.jpg`}
                      alt={`Related Module ${relatedId}`}
                      width={200}
                      height={120}
                      className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mb-1 font-medium group-hover:text-primary">
                    {relatedId === 1
                      ? "Magisk Module Collection"
                      : relatedId === 2
                      ? "Battery Optimizer Pro"
                      : relatedId === 3
                      ? "Performance Booster"
                      : "Dark Mode Everywhere"}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-on-surface-variant">
                    <div className="flex items-center space-x-1">
                      <FiDownload className="h-3 w-3" />
                      <span>
                        {relatedId === 1
                          ? "15k+"
                          : relatedId === 2
                          ? "8k+"
                          : relatedId === 3
                          ? "12k+"
                          : "9k+"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiStar className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>
                        {relatedId === 1
                          ? "4.8"
                          : relatedId === 2
                          ? "4.5"
                          : relatedId === 3
                          ? "4.7"
                          : "4.6"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
