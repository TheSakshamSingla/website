"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMessageSquare, FiUser, FiClock, FiEye, FiHeart, FiMessageCircle, FiPlus, FiSearch } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

// Types
type ForumCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: number;
  posts: number;
};

type ForumTopic = {
  id: string;
  title: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  replies: number;
  views: number;
  lastReply: {
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  };
  isPinned: boolean;
  isHot: boolean;
};

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "unanswered">("latest");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for forum categories
  const categories: ForumCategory[] = [
    {
      id: "general",
      name: "General Discussion",
      description: "General discussions about Android rooting and customization",
      icon: "🔧",
      color: "bg-blue-100 text-blue-800",
      topics: 156,
      posts: 1243,
    },
    {
      id: "magisk",
      name: "Magisk Modules",
      description: "Discussions about Magisk modules, development, and troubleshooting",
      icon: "⚡",
      color: "bg-purple-100 text-purple-800",
      topics: 243,
      posts: 2156,
    },
    {
      id: "kernels",
      name: "Custom Kernels",
      description: "Custom kernel development, installation, and optimization",
      icon: "🔋",
      color: "bg-green-100 text-green-800",
      topics: 98,
      posts: 876,
    },
    {
      id: "roms",
      name: "Custom ROMs",
      description: "Custom ROM discussions, development, and installation guides",
      icon: "📱",
      color: "bg-orange-100 text-orange-800",
      topics: 124,
      posts: 1087,
    },
    {
      id: "help",
      name: "Help & Support",
      description: "Get help with rooting, bootloops, and other issues",
      icon: "🆘",
      color: "bg-red-100 text-red-800",
      topics: 321,
      posts: 2765,
    },
    {
      id: "development",
      name: "Development",
      description: "App and module development discussions",
      icon: "💻",
      color: "bg-indigo-100 text-indigo-800",
      topics: 87,
      posts: 654,
    },
  ];

  // Mock data for forum topics
  const topics: ForumTopic[] = [
    {
      id: "1",
      title: "How to fix SafetyNet after latest Google Play Services update?",
      category: "help",
      author: {
        id: "101",
        name: "John Doe",
        avatar: "/images/avatar-1.jpg",
      },
      createdAt: "2025-03-28T14:30:00Z",
      replies: 24,
      views: 1243,
      lastReply: {
        author: {
          id: "102",
          name: "Jane Smith",
          avatar: "/images/avatar-2.jpg",
        },
        createdAt: "2025-03-30T09:15:00Z",
      },
      isPinned: true,
      isHot: true,
    },
    {
      id: "2",
      title: "Announcing new battery optimization module - Beta testers needed!",
      category: "magisk",
      author: {
        id: "103",
        name: "Alex Johnson",
        avatar: "/images/avatar-3.jpg",
      },
      createdAt: "2025-03-27T10:45:00Z",
      replies: 18,
      views: 876,
      lastReply: {
        author: {
          id: "104",
          name: "Sarah Williams",
          avatar: "/images/avatar-4.jpg",
        },
        createdAt: "2025-03-29T16:20:00Z",
      },
      isPinned: false,
      isHot: true,
    },
    {
      id: "3",
      title: "Guide: How to compile a custom kernel for Samsung Galaxy S23",
      category: "kernels",
      author: {
        id: "105",
        name: "Michael Brown",
        avatar: "/images/avatar-5.jpg",
      },
      createdAt: "2025-03-25T08:30:00Z",
      replies: 32,
      views: 1587,
      lastReply: {
        author: {
          id: "106",
          name: "Emily Davis",
          avatar: "/images/avatar-6.jpg",
        },
        createdAt: "2025-03-30T11:45:00Z",
      },
      isPinned: true,
      isHot: false,
    },
    {
      id: "4",
      title: "Discussion: What features would you like to see in the next Magisk update?",
      category: "general",
      author: {
        id: "107",
        name: "David Wilson",
        avatar: "/images/avatar-7.jpg",
      },
      createdAt: "2025-03-26T12:15:00Z",
      replies: 45,
      views: 2134,
      lastReply: {
        author: {
          id: "108",
          name: "Robert Chen",
          avatar: "/images/avatar-8.jpg",
        },
        createdAt: "2025-03-30T10:30:00Z",
      },
      isPinned: false,
      isHot: true,
    },
    {
      id: "5",
      title: "Pixel Experience ROM for OnePlus 11 - Installation guide and review",
      category: "roms",
      author: {
        id: "109",
        name: "Lisa Taylor",
        avatar: "/images/avatar-9.jpg",
      },
      createdAt: "2025-03-24T15:20:00Z",
      replies: 27,
      views: 1432,
      lastReply: {
        author: {
          id: "110",
          name: "Kevin Martin",
          avatar: "/images/avatar-10.jpg",
        },
        createdAt: "2025-03-29T14:10:00Z",
      },
      isPinned: false,
      isHot: false,
    },
    {
      id: "6",
      title: "Creating Magisk modules: Best practices and common pitfalls",
      category: "development",
      author: {
        id: "111",
        name: "Amanda Lee",
        avatar: "/images/avatar-11.jpg",
      },
      createdAt: "2025-03-23T09:45:00Z",
      replies: 15,
      views: 876,
      lastReply: {
        author: {
          id: "112",
          name: "Thomas Wang",
          avatar: "/images/avatar-12.jpg",
        },
        createdAt: "2025-03-28T17:30:00Z",
      },
      isPinned: false,
      isHot: false,
    },
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Filter topics based on active tab
  const getFilteredTopics = () => {
    let filtered = [...topics];
    
    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        topic =>
          topic.title.toLowerCase().includes(query) ||
          topic.category.toLowerCase().includes(query) ||
          topic.author.name.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    switch (activeTab) {
      case "latest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "unanswered":
        filtered = filtered.filter(topic => topic.replies === 0);
        break;
    }
    
    // Always show pinned topics at the top
    return [
      ...filtered.filter(topic => topic.isPinned),
      ...filtered.filter(topic => !topic.isPinned),
    ];
  };

  const filteredTopics = getFilteredTopics();

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center"
          >
            <div>
              <h1 className="mb-2 text-3xl font-bold">Community Forum</h1>
              <p className="text-on-surface-variant">
                Join discussions, ask questions, and share your knowledge with the Root Things community.
              </p>
            </div>
            <Link href="/forum/new" className="btn-primary flex items-center self-start">
              <FiPlus className="mr-2" />
              New Topic
            </Link>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="h-5 w-5 text-on-surface-variant" />
              </div>
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-lg border border-outline-variant bg-surface py-2 pl-10 pr-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Categories</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/forum/category/${category.id}`}
                  className="flex items-start rounded-lg border border-outline-variant p-4 transition-all duration-300 hover:border-primary hover:md-elevation-1"
                >
                  <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${category.color}`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium">{category.name}</h3>
                    <p className="mb-2 text-sm text-on-surface-variant line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-on-surface-variant">
                      <span>{category.topics} topics</span>
                      <span>{category.posts} posts</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Discussions</h2>
              <div className="flex rounded-lg border border-outline-variant">
                <button
                  onClick={() => setActiveTab("latest")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "latest"
                      ? "bg-primary-container text-on-primary-container"
                      : "text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setActiveTab("popular")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "popular"
                      ? "bg-primary-container text-on-primary-container"
                      : "text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => setActiveTab("unanswered")}
                  className={`px-4 py-2 text-sm ${
                    activeTab === "unanswered"
                      ? "bg-primary-container text-on-primary-container"
                      : "text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  Unanswered
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => {
                  const category = categories.find(c => c.id === topic.category);
                  
                  return (
                    <div
                      key={topic.id}
                      className={`rounded-lg border ${
                        topic.isPinned ? "border-primary bg-primary-container/10" : "border-outline-variant"
                      } p-4 transition-all duration-300 hover:md-elevation-1`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0 md:mr-4 md:flex-grow">
                          <div className="mb-2 flex items-center space-x-2">
                            {topic.isPinned && (
                              <span className="rounded-full bg-primary-container px-2 py-0.5 text-xs text-on-primary-container">
                                Pinned
                              </span>
                            )}
                            {topic.isHot && (
                              <span className="rounded-full bg-error-container px-2 py-0.5 text-xs text-on-error-container">
                                Hot
                              </span>
                            )}
                            {category && (
                              <span className={`rounded-full px-2 py-0.5 text-xs ${category.color}`}>
                                {category.name}
                              </span>
                            )}
                          </div>
                          
                          <Link href={`/forum/topic/${topic.id}`} className="group">
                            <h3 className="mb-2 text-lg font-medium group-hover:text-primary">
                              {topic.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center space-x-4 text-sm text-on-surface-variant">
                            <div className="flex items-center space-x-1">
                              <FiUser className="h-4 w-4" />
                              <Link href={`/profile/${topic.author.id}`} className="hover:text-primary">
                                {topic.author.name}
                              </Link>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FiClock className="h-4 w-4" />
                              <span>{formatDate(topic.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-1 text-on-surface-variant">
                              <FiMessageCircle className="h-4 w-4" />
                              <span>{topic.replies}</span>
                            </div>
                            <span className="text-xs text-on-surface-variant">Replies</span>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-1 text-on-surface-variant">
                              <FiEye className="h-4 w-4" />
                              <span>{topic.views}</span>
                            </div>
                            <span className="text-xs text-on-surface-variant">Views</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Last Reply */}
                      {topic.replies > 0 && (
                        <div className="mt-4 flex items-center justify-end space-x-2 border-t border-outline-variant pt-4 text-sm text-on-surface-variant">
                          <span>Last reply by</span>
                          <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 overflow-hidden rounded-full">
                              <Image
                                src={topic.lastReply.author.avatar}
                                alt={topic.lastReply.author.name}
                                width={24}
                                height={24}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <Link href={`/profile/${topic.lastReply.author.id}`} className="hover:text-primary">
                              {topic.lastReply.author.name}
                            </Link>
                          </div>
                          <span>{formatDate(topic.lastReply.createdAt)}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-lg bg-surface-variant p-8 text-center">
                  <FiMessageSquare className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                  <h3 className="mb-2 text-xl font-medium">No topics found</h3>
                  <p className="mb-6 text-on-surface-variant">
                    {searchQuery
                      ? "We couldn't find any topics matching your search criteria."
                      : "There are no topics in this category yet."}
                  </p>
                  <Link href="/forum/new" className="btn-primary">
                    Create a New Topic
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
