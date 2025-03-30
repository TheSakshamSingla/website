"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiDownload, FiHeart, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

// Types
type SearchResult = {
  id: string;
  name: string;
  description: string;
  image: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  type: "module" | "script" | "kernel";
  category: string;
  downloads: number;
  createdAt: string;
  tags: string[];
};

type FilterState = {
  query: string;
  category: string;
  type: string;
  sortBy: "newest" | "popular" | "downloads";
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    query: initialQuery,
    category: "all",
    type: "all",
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Categories for filter
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "system", name: "System Mods" },
    { id: "performance", name: "Performance" },
    { id: "battery", name: "Battery" },
    { id: "ui", name: "UI Enhancements" },
    { id: "security", name: "Security" },
    { id: "customization", name: "Customization" },
  ];

  // Types for filter
  const types = [
    { id: "all", name: "All Types" },
    { id: "module", name: "Modules" },
    { id: "script", name: "Scripts" },
    { id: "kernel", name: "Kernels" },
  ];

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // await fetch(`/api/files/search?query=${filters.query}`)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockResults: SearchResult[] = [
          {
            id: "1",
            name: "Magisk Module Collection",
            description: "A comprehensive collection of the most popular Magisk modules for enhanced functionality.",
            image: "/images/module-1.jpg",
            author: {
              id: "101",
              name: "John Doe",
              avatar: "/images/avatar-1.jpg"
            },
            type: "module",
            category: "system",
            downloads: 15420,
            createdAt: "2025-03-05T09:15:00Z",
            tags: ["magisk", "system", "root"]
          },
          {
            id: "2",
            name: "Battery Optimizer Pro",
            description: "Extend your battery life by up to 40% with this advanced optimization module.",
            image: "/images/module-2.jpg",
            author: {
              id: "102",
              name: "Jane Smith",
              avatar: "/images/avatar-2.jpg"
            },
            type: "module",
            category: "battery",
            downloads: 8753,
            createdAt: "2025-02-15T10:30:00Z",
            tags: ["battery", "optimization", "power"]
          },
          {
            id: "3",
            name: "Performance Booster",
            description: "Unlock hidden performance settings and boost your device's speed significantly.",
            image: "/images/module-3.jpg",
            author: {
              id: "103",
              name: "Alex Johnson",
              avatar: "/images/avatar-3.jpg"
            },
            type: "module",
            category: "performance",
            downloads: 12089,
            createdAt: "2025-01-20T14:45:00Z",
            tags: ["performance", "speed", "optimization"]
          },
          {
            id: "4",
            name: "Dark Mode Everywhere",
            description: "Force dark mode on all apps, even those that don't natively support it.",
            image: "/images/module-4.jpg",
            author: {
              id: "104",
              name: "Sarah Williams",
              avatar: "/images/avatar-4.jpg"
            },
            type: "module",
            category: "ui",
            downloads: 9876,
            createdAt: "2025-02-28T08:20:00Z",
            tags: ["dark mode", "ui", "theme"]
          },
          {
            id: "5",
            name: "Advanced Privacy Guard",
            description: "Protect your privacy with advanced permission controls and tracking prevention.",
            image: "/images/module-5.jpg",
            author: {
              id: "105",
              name: "Michael Brown",
              avatar: "/images/avatar-5.jpg"
            },
            type: "module",
            category: "security",
            downloads: 7654,
            createdAt: "2025-03-10T16:30:00Z",
            tags: ["privacy", "security", "permissions"]
          },
          {
            id: "6",
            name: "Custom Navigation Gestures",
            description: "Customize navigation gestures and add new functionality to your device.",
            image: "/images/module-6.jpg",
            author: {
              id: "106",
              name: "Emily Davis",
              avatar: "/images/avatar-6.jpg"
            },
            type: "module",
            category: "customization",
            downloads: 6543,
            createdAt: "2025-03-15T11:45:00Z",
            tags: ["gestures", "navigation", "customization"]
          },
          {
            id: "7",
            name: "Root Explorer Pro",
            description: "Advanced file manager for rooted devices with full system access.",
            image: "/images/script-1.jpg",
            author: {
              id: "107",
              name: "David Wilson",
              avatar: "/images/avatar-7.jpg"
            },
            type: "script",
            category: "system",
            downloads: 5432,
            createdAt: "2025-02-10T13:20:00Z",
            tags: ["file manager", "root", "explorer"]
          },
          {
            id: "8",
            name: "Overclock Kernel",
            description: "Custom kernel with advanced CPU and GPU overclocking capabilities.",
            image: "/images/kernel-1.jpg",
            author: {
              id: "108",
              name: "Robert Chen",
              avatar: "/images/avatar-8.jpg"
            },
            type: "kernel",
            category: "performance",
            downloads: 4321,
            createdAt: "2025-01-05T16:15:00Z",
            tags: ["kernel", "overclock", "performance"]
          },
        ];
        
        // Filter by query if provided
        let filtered = mockResults;
        if (initialQuery) {
          const query = initialQuery.toLowerCase();
          filtered = mockResults.filter(
            result =>
              result.name.toLowerCase().includes(query) ||
              result.description.toLowerCase().includes(query) ||
              result.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        setResults(mockResults);
        setFilteredResults(filtered);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [initialQuery]);

  // Apply filters when they change
  useEffect(() => {
    if (results.length === 0) return;
    
    let filtered = [...results];
    
    // Apply search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        result =>
          result.name.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query) ||
          result.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(result => result.category === filters.category);
    }
    
    // Apply type filter
    if (filters.type !== "all") {
      filtered = filtered.filter(result => result.type === filters.type);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popular":
        // In a real app, this might be based on ratings or views
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "downloads":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
    }
    
    setFilteredResults(filtered);
  }, [filters, results]);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, query: e.target.value }));
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  // Handle type change
  const handleTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, type }));
  };

  // Handle sort change
  const handleSortChange = (sortBy: "newest" | "popular" | "downloads") => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      query: initialQuery,
      category: "all",
      type: "all",
      sortBy: "newest",
    });
  };

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="mb-4 text-3xl font-bold">Search Results</h1>
            {initialQuery && (
              <p className="text-on-surface-variant">
                Showing results for "<span className="font-medium text-on-surface">{initialQuery}</span>"
              </p>
            )}
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input
                  type="text"
                  placeholder="Search modules, scripts, or kernels..."
                  value={filters.query}
                  onChange={handleSearch}
                  className="block w-full rounded-lg border border-outline-variant bg-surface py-2 pl-10 pr-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-on-surface hover:bg-surface-variant"
              >
                <FiFilter className="h-5 w-5" />
                <span>Filters</span>
                {showFilters ? (
                  <FiChevronUp className="h-5 w-5" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-on-surface-variant">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                  className="rounded-lg border border-outline-variant bg-surface py-2 pl-3 pr-8 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                  <option value="downloads">Most Downloads</option>
                </select>
              </div>
            </div>
            
            {/* Expanded Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden rounded-lg border border-outline-variant bg-surface p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`rounded-full px-3 py-1 text-sm ${
                            filters.category === category.id
                              ? "bg-primary text-on-primary"
                              : "bg-surface-variant text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {types.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleTypeChange(type.id)}
                          className={`rounded-full px-3 py-1 text-sm ${
                            filters.type === type.id
                              ? "bg-primary text-on-primary"
                              : "bg-surface-variant text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container"
                          }`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80"
                  >
                    <FiX className="h-4 w-4" />
                    <span>Clear Filters</span>
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Active Filters Summary */}
            {(filters.query !== initialQuery || filters.category !== "all" || filters.type !== "all") && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-on-surface-variant">Active filters:</span>
                
                {filters.query !== initialQuery && (
                  <div className="flex items-center space-x-1 rounded-full bg-primary-container px-3 py-1 text-sm text-on-primary-container">
                    <span>Search: {filters.query}</span>
                    <button onClick={() => setFilters(prev => ({ ...prev, query: initialQuery }))}>
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {filters.category !== "all" && (
                  <div className="flex items-center space-x-1 rounded-full bg-primary-container px-3 py-1 text-sm text-on-primary-container">
                    <span>Category: {categories.find(c => c.id === filters.category)?.name}</span>
                    <button onClick={() => setFilters(prev => ({ ...prev, category: "all" }))}>
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {filters.type !== "all" && (
                  <div className="flex items-center space-x-1 rounded-full bg-primary-container px-3 py-1 text-sm text-on-primary-container">
                    <span>Type: {types.find(t => t.id === filters.type)?.name}</span>
                    <button onClick={() => setFilters(prev => ({ ...prev, type: "all" }))}>
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results Stats */}
          <div className="mb-6 text-on-surface-variant">
            {!isLoading && (
              <p>{filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found</p>
            )}
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="mb-4 h-48 w-full rounded-lg bg-surface-variant"></div>
                  <div className="mb-2 h-6 w-3/4 rounded bg-surface-variant"></div>
                  <div className="mb-4 h-4 w-full rounded bg-surface-variant"></div>
                  <div className="mb-2 h-4 w-1/2 rounded bg-surface-variant"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-surface-variant"></div>
                      <div className="h-4 w-24 rounded bg-surface-variant"></div>
                    </div>
                    <div className="h-4 w-16 rounded bg-surface-variant"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card group relative transition-all duration-300 hover:md-elevation-3"
                >
                  <div className="absolute right-4 top-4 z-10">
                    <button
                      onClick={() => toggleFavorite(result.id)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        favorites.includes(result.id)
                          ? "bg-primary text-on-primary"
                          : "bg-surface/80 text-on-surface hover:bg-primary-container hover:text-on-primary-container"
                      }`}
                    >
                      <FiHeart
                        className={`h-4 w-4 ${favorites.includes(result.id) ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>
                  
                  <Link href={`/modules/${result.id}`}>
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={result.image}
                        alt={result.name}
                        width={400}
                        height={225}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="mb-2 flex items-center space-x-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        result.type === "module" 
                          ? "bg-primary-container text-on-primary-container" 
                          : result.type === "script"
                            ? "bg-secondary-container text-on-secondary-container"
                            : "bg-tertiary-container text-on-tertiary-container"
                      }`}>
                        {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                      </span>
                      <span className="rounded-full bg-surface-variant px-2 py-0.5 text-xs text-on-surface-variant capitalize">
                        {result.category}
                      </span>
                    </div>
                    
                    <h3 className="mb-2 text-xl font-bold">{result.name}</h3>
                    <p className="mb-4 text-on-surface-variant line-clamp-2">{result.description}</p>
                    
                    <div className="mb-4 flex flex-wrap gap-2">
                      {result.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-surface-variant px-2 py-1 text-xs text-on-surface-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={result.author.avatar}
                            alt={result.author.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-on-surface-variant">{result.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-on-surface-variant">
                        <FiDownload className="h-4 w-4" />
                        <span>{result.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-surface-variant p-12 text-center">
              <FiSearch className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
              <h3 className="mb-2 text-xl font-medium">No results found</h3>
              <p className="mb-6 text-on-surface-variant">
                We couldn't find any results matching your search criteria.
              </p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
