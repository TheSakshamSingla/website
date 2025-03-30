"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiEdit, FiDownload, FiHeart, FiUpload, FiSave } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import MainLayout from "@/components/layout/main-layout";

// Form validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  email: z.string().email("Please enter a valid email address").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [userFiles, setUserFiles] = useState<any[]>([]);
  const [favoriteFiles, setFavoriteFiles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"uploads" | "downloads" | "favorites">("uploads");
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
    }
  });

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, this would fetch the user's profile from the API
    const fetchUserProfile = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const userData = {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          bio: "Android enthusiast and developer. I love creating custom ROMs and modules for various devices.",
          image: "/images/avatar-1.jpg",
        };
        
        setValue("name", userData.name);
        setValue("bio", userData.bio || "");
        setValue("email", userData.email);
        setProfileImage(userData.image);
        
        // Fetch user's files
        await fetchUserFiles();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    
    fetchUserProfile();
  }, [setValue]);

  // Simulate fetching user files
  const fetchUserFiles = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user files data
      const mockUserFiles = [
        {
          id: "1",
          name: "Battery Optimizer Pro",
          description: "Extend your battery life by up to 40% with this advanced optimization module.",
          type: "module",
          downloadCount: 8753,
          image: "/images/module-2.jpg",
          createdAt: "2025-02-15T10:30:00Z",
        },
        {
          id: "2",
          name: "Custom Kernel for Pixel 7",
          description: "Enhanced performance and battery life for Google Pixel 7 devices.",
          type: "kernel",
          downloadCount: 3421,
          image: "/images/module-3.jpg",
          createdAt: "2025-01-20T14:45:00Z",
        },
      ];
      
      // Mock favorite files data
      const mockFavoriteFiles = [
        {
          id: "3",
          name: "Magisk Module Collection",
          description: "A comprehensive collection of the most popular Magisk modules for enhanced functionality.",
          type: "module",
          downloadCount: 15420,
          image: "/images/module-1.jpg",
          createdAt: "2025-03-05T09:15:00Z",
        },
      ];
      
      setUserFiles(mockUserFiles);
      setFavoriteFiles(mockFavoriteFiles);
    } catch (error) {
      console.error("Error fetching user files:", error);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      // Here you would typically call your API to update the user's profile
      console.log("Profile update data:", data);
      
      // If there's a new profile image, upload it
      if (newProfileImage) {
        // In a real app, you would upload the image to Cloudflare R2
        console.log("Uploading new profile image:", newProfileImage);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the profile image if a new one was selected
      if (newProfileImage) {
        const imageUrl = URL.createObjectURL(newProfileImage);
        setProfileImage(imageUrl);
        setNewProfileImage(null);
      }
      
      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(e.target.files[0]);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-32 w-32 overflow-hidden rounded-full">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary-container">
                        <FiUser className="h-16 w-16 text-on-primary-container" />
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <label
                      htmlFor="profile-image-upload"
                      className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary"
                    >
                      <FiEdit className="h-4 w-4" />
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageChange}
                      />
                    </label>
                  )}
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="block w-full rounded-lg border border-outline-variant bg-surface py-2 px-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        disabled
                        className="block w-full rounded-lg border border-outline-variant bg-surface-variant py-2 px-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary opacity-70"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-on-surface mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        {...register("bio")}
                        rows={4}
                        className="block w-full rounded-lg border border-outline-variant bg-surface py-2 px-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      ></textarea>
                      {errors.bio && (
                        <p className="mt-1 text-sm text-error">{errors.bio.message}</p>
                      )}
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn-text"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <FiSave className="h-4 w-4" />
                            <span>Save</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{register.name}</h2>
                    <p className="text-on-surface-variant">{register.email}</p>
                    
                    <div className="mt-4 w-full">
                      <h3 className="mb-2 text-lg font-medium">Bio</h3>
                      <p className="text-on-surface-variant">
                        {register.bio || "No bio provided yet."}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary mt-6 flex items-center space-x-2"
                    >
                      <FiEdit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-8 border-t border-outline-variant pt-6">
                <h3 className="mb-4 text-lg font-medium">Stats</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-surface-variant p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{userFiles.length}</div>
                    <div className="text-xs text-on-surface-variant">Uploads</div>
                  </div>
                  <div className="rounded-lg bg-surface-variant p-3 text-center">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-xs text-on-surface-variant">Downloads</div>
                  </div>
                  <div className="rounded-lg bg-surface-variant p-3 text-center">
                    <div className="text-2xl font-bold text-primary">{favoriteFiles.length}</div>
                    <div className="text-xs text-on-surface-variant">Favorites</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* User Content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <div className="mb-6 flex border-b border-outline-variant pb-4">
                <button
                  onClick={() => setActiveTab("uploads")}
                  className={`mr-4 flex items-center space-x-2 pb-2 ${
                    activeTab === "uploads"
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  <FiUpload className="h-4 w-4" />
                  <span>My Uploads</span>
                </button>
                <button
                  onClick={() => setActiveTab("downloads")}
                  className={`mr-4 flex items-center space-x-2 pb-2 ${
                    activeTab === "downloads"
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  <FiDownload className="h-4 w-4" />
                  <span>Downloads</span>
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`flex items-center space-x-2 pb-2 ${
                    activeTab === "favorites"
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  <FiHeart className="h-4 w-4" />
                  <span>Favorites</span>
                </button>
              </div>
              
              {/* Content based on active tab */}
              {activeTab === "uploads" && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">My Uploads</h2>
                    <button className="btn-primary flex items-center space-x-2">
                      <FiUpload className="h-4 w-4" />
                      <span>Upload New</span>
                    </button>
                  </div>
                  
                  {userFiles.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {userFiles.map((file) => (
                        <div key={file.id} className="rounded-lg border border-outline-variant bg-surface p-4 transition-all duration-300 hover:md-elevation-2">
                          <div className="mb-2 flex items-center space-x-2">
                            <div className="h-10 w-10 overflow-hidden rounded-lg">
                              <Image
                                src={file.image || "/images/placeholder.jpg"}
                                alt={file.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{file.name}</h3>
                              <p className="text-xs text-on-surface-variant">{file.type}</p>
                            </div>
                          </div>
                          <p className="mb-2 text-sm text-on-surface-variant line-clamp-2">{file.description}</p>
                          <div className="flex items-center justify-between text-xs text-on-surface-variant">
                            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                            <div className="flex items-center space-x-1">
                              <FiDownload className="h-3 w-3" />
                              <span>{file.downloadCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-surface-variant p-8 text-center">
                      <FiUpload className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                      <h3 className="mb-2 text-lg font-medium">No uploads yet</h3>
                      <p className="mb-4 text-on-surface-variant">
                        Share your modules, scripts, or kernels with the community.
                      </p>
                      <button className="btn-primary">Upload Your First File</button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === "downloads" && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">My Downloads</h2>
                  <div className="rounded-lg bg-surface-variant p-8 text-center">
                    <FiDownload className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                    <h3 className="mb-2 text-lg font-medium">No downloads yet</h3>
                    <p className="mb-4 text-on-surface-variant">
                      Browse our collection and download modules, scripts, or kernels.
                    </p>
                    <button className="btn-primary">Explore Files</button>
                  </div>
                </div>
              )}
              
              {activeTab === "favorites" && (
                <div>
                  <h2 className="mb-4 text-xl font-bold">My Favorites</h2>
                  
                  {favoriteFiles.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {favoriteFiles.map((file) => (
                        <div key={file.id} className="rounded-lg border border-outline-variant bg-surface p-4 transition-all duration-300 hover:md-elevation-2">
                          <div className="mb-2 flex items-center space-x-2">
                            <div className="h-10 w-10 overflow-hidden rounded-lg">
                              <Image
                                src={file.image || "/images/placeholder.jpg"}
                                alt={file.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{file.name}</h3>
                              <p className="text-xs text-on-surface-variant">{file.type}</p>
                            </div>
                          </div>
                          <p className="mb-2 text-sm text-on-surface-variant line-clamp-2">{file.description}</p>
                          <div className="flex items-center justify-between text-xs text-on-surface-variant">
                            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                            <div className="flex items-center space-x-1">
                              <FiDownload className="h-3 w-3" />
                              <span>{file.downloadCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-surface-variant p-8 text-center">
                      <FiHeart className="mx-auto mb-4 h-12 w-12 text-on-surface-variant opacity-50" />
                      <h3 className="mb-2 text-lg font-medium">No favorites yet</h3>
                      <p className="mb-4 text-on-surface-variant">
                        Mark files as favorites to easily find them later.
                      </p>
                      <button className="btn-primary">Explore Files</button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
