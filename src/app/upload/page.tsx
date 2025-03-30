"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiUpload, FiX, FiInfo, FiCheckCircle, FiAlertCircle, FiImage, FiFile } from "react-icons/fi";
import MainLayout from "@/components/layout/main-layout";

// Form validation schema
const uploadSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description is too long"),
  category: z.enum(["system", "performance", "battery", "ui", "security", "customization", "other"]),
  type: z.enum(["module", "script", "kernel"]),
  tags: z.string().refine(value => value.split(",").filter(tag => tag.trim()).length > 0, {
    message: "At least one tag is required",
  }),
  compatibility: z.string().optional(),
  requirements: z.string().optional(),
  version: z.string().min(1, "Version is required"),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screenshotsInputRef = useRef<HTMLInputElement>(null);

  // Initialize form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category: "system",
      type: "module",
      tags: "",
      compatibility: "",
      requirements: "",
      version: "1.0.0",
    },
  });

  // Handle main file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  // Handle screenshots drop
  const onScreenshotsDrop = useCallback((acceptedFiles: File[]) => {
    // Limit to 4 screenshots
    const newScreenshots = [...screenshots, ...acceptedFiles].slice(0, 4);
    setScreenshots(newScreenshots);
  }, [screenshots]);

  const {
    getRootProps: getScreenshotsRootProps,
    getInputProps: getScreenshotsInputProps,
    isDragActive: isScreenshotsDragActive,
  } = useDropzone({
    onDrop: onScreenshotsDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 4,
    maxSize: 5 * 1024 * 1024, // 5MB per image
  });

  // Remove screenshot
  const removeScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  // Clear file
  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const onSubmit = async (data: UploadFormData) => {
    if (!file) {
      setUploadError("Please upload a file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("type", data.type);
      formData.append("tags", data.tags);
      formData.append("version", data.version);
      
      if (data.compatibility) {
        formData.append("compatibility", data.compatibility);
      }
      
      if (data.requirements) {
        formData.append("requirements", data.requirements);
      }
      
      // Append screenshots
      screenshots.forEach((screenshot, index) => {
        formData.append(`screenshot_${index}`, screenshot);
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);

      // In a real app, this would be an API call
      // const response = await fetch("/api/files/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadSuccess(true);
      
      // Reset form after successful upload
      setTimeout(() => {
        reset();
        setFile(null);
        setScreenshots([]);
        setUploadSuccess(false);
        setUploadProgress(0);
        
        // Redirect to the module page (in a real app, this would go to the newly created module)
        router.push("/modules");
      }, 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-surface py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold">Upload Your Module</h1>
            <p className="mx-auto max-w-2xl text-on-surface-variant">
              Share your custom modules, scripts, or kernels with the Root Things community.
              Help others enhance their Android experience with your creations.
            </p>
          </motion.div>

          {uploadSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mb-8 max-w-md rounded-lg bg-primary-container p-6 text-center text-on-primary-container"
            >
              <FiCheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
              <h2 className="mb-2 text-2xl font-bold">Upload Successful!</h2>
              <p className="mb-4">
                Your module has been successfully uploaded and is now being processed.
                It will be available on the platform shortly.
              </p>
              <p className="text-sm">Redirecting to modules page...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-4xl rounded-lg border border-outline-variant bg-surface p-6 md:p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Main File Upload */}
                <div className="space-y-4">
                  <h2 className="text-xl font-medium">Upload Module File</h2>
                  
                  <div 
                    {...getRootProps()} 
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                      isDragActive 
                        ? "border-primary bg-primary-container/30" 
                        : file 
                          ? "border-success bg-success-container/20" 
                          : "border-outline-variant hover:border-primary hover:bg-primary-container/10"
                    }`}
                  >
                    <input {...getInputProps()} ref={fileInputRef} />
                    
                    {file ? (
                      <div className="flex flex-col items-center">
                        <FiFile className="mb-2 h-12 w-12 text-success" />
                        <p className="mb-1 font-medium">{file.name}</p>
                        <p className="text-sm text-on-surface-variant">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFile();
                          }}
                          className="mt-2 flex items-center text-sm text-error hover:text-error/80"
                        >
                          <FiX className="mr-1 h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FiUpload className="mb-2 h-12 w-12 text-on-surface-variant" />
                        <p className="mb-1 font-medium">
                          {isDragActive ? "Drop your file here" : "Drag and drop your ZIP file here"}
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          or <span className="text-primary">browse files</span>
                        </p>
                        <p className="mt-2 text-xs text-on-surface-variant">
                          Maximum file size: 50MB
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {uploadError && (
                    <div className="rounded-md bg-error-container p-3 text-on-error-container">
                      <div className="flex">
                        <FiAlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                        <p>{uploadError}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Screenshots Upload */}
                <div className="space-y-4">
                  <h2 className="text-xl font-medium">Upload Screenshots (Optional)</h2>
                  <p className="text-sm text-on-surface-variant">
                    Add up to 4 screenshots to showcase your module in action.
                  </p>
                  
                  <div 
                    {...getScreenshotsRootProps()} 
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                      isScreenshotsDragActive 
                        ? "border-primary bg-primary-container/30" 
                        : "border-outline-variant hover:border-primary hover:bg-primary-container/10"
                    }`}
                  >
                    <input {...getScreenshotsInputProps()} ref={screenshotsInputRef} />
                    
                    <div className="flex flex-col items-center">
                      <FiImage className="mb-2 h-8 w-8 text-on-surface-variant" />
                      <p className="mb-1 font-medium">
                        {isScreenshotsDragActive ? "Drop images here" : "Drag and drop screenshots here"}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        or <span className="text-primary">browse images</span>
                      </p>
                      <p className="mt-2 text-xs text-on-surface-variant">
                        JPG or PNG, max 5MB each
                      </p>
                    </div>
                  </div>
                  
                  {screenshots.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {screenshots.map((screenshot, index) => (
                        <div key={index} className="relative rounded-md border border-outline-variant p-2">
                          <div className="relative h-24 w-full overflow-hidden rounded">
                            <Image
                              src={URL.createObjectURL(screenshot)}
                              alt={`Screenshot ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)}
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-surface text-error shadow-md hover:bg-error hover:text-on-error"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Module Details */}
                <div className="space-y-6">
                  <h2 className="text-xl font-medium">Module Details</h2>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="mb-1 block font-medium">
                        Module Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`w-full rounded-lg border ${
                          errors.name ? "border-error" : "border-outline-variant"
                        } bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                        placeholder="Enter module name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                      )}
                    </div>
                    
                    {/* Version */}
                    <div>
                      <label htmlFor="version" className="mb-1 block font-medium">
                        Version <span className="text-error">*</span>
                      </label>
                      <input
                        id="version"
                        type="text"
                        {...register("version")}
                        className={`w-full rounded-lg border ${
                          errors.version ? "border-error" : "border-outline-variant"
                        } bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                        placeholder="e.g., 1.0.0"
                      />
                      {errors.version && (
                        <p className="mt-1 text-sm text-error">{errors.version.message}</p>
                      )}
                    </div>
                    
                    {/* Type */}
                    <div>
                      <label htmlFor="type" className="mb-1 block font-medium">
                        Type <span className="text-error">*</span>
                      </label>
                      <select
                        id="type"
                        {...register("type")}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="module">Magisk Module</option>
                        <option value="script">Script</option>
                        <option value="kernel">Custom Kernel</option>
                      </select>
                      {errors.type && (
                        <p className="mt-1 text-sm text-error">{errors.type.message}</p>
                      )}
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label htmlFor="category" className="mb-1 block font-medium">
                        Category <span className="text-error">*</span>
                      </label>
                      <select
                        id="category"
                        {...register("category")}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="system">System Mods</option>
                        <option value="performance">Performance</option>
                        <option value="battery">Battery</option>
                        <option value="ui">UI Enhancements</option>
                        <option value="security">Security</option>
                        <option value="customization">Customization</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-error">{errors.category.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="mb-1 block font-medium">
                      Description <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="description"
                      {...register("description")}
                      rows={4}
                      className={`w-full rounded-lg border ${
                        errors.description ? "border-error" : "border-outline-variant"
                      } bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                      placeholder="Describe what your module does and its key features"
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-error">{errors.description.message}</p>
                    )}
                    <p className="mt-1 text-sm text-on-surface-variant">
                      {500 - (register("description").value?.length || 0)} characters remaining
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="mb-1 block font-medium">
                      Tags <span className="text-error">*</span>
                    </label>
                    <input
                      id="tags"
                      type="text"
                      {...register("tags")}
                      className={`w-full rounded-lg border ${
                        errors.tags ? "border-error" : "border-outline-variant"
                      } bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                      placeholder="e.g., performance, battery, system (comma separated)"
                    />
                    {errors.tags && (
                      <p className="mt-1 text-sm text-error">{errors.tags.message}</p>
                    )}
                    <p className="mt-1 text-sm text-on-surface-variant">
                      Separate tags with commas
                    </p>
                  </div>
                  
                  {/* Requirements */}
                  <div>
                    <label htmlFor="requirements" className="mb-1 block font-medium">
                      Requirements (Optional)
                    </label>
                    <textarea
                      id="requirements"
                      {...register("requirements")}
                      rows={3}
                      className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g., Android 10+, Magisk 24.0+, Root access"
                    ></textarea>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      List any requirements needed to use your module
                    </p>
                  </div>
                  
                  {/* Compatibility */}
                  <div>
                    <label htmlFor="compatibility" className="mb-1 block font-medium">
                      Device Compatibility (Optional)
                    </label>
                    <textarea
                      id="compatibility"
                      {...register("compatibility")}
                      rows={3}
                      className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="e.g., Samsung Galaxy S21/S22 series, Google Pixel 6/7 series"
                    ></textarea>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      List devices that you've tested this module on
                    </p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="rounded-lg bg-surface-variant p-4">
                  <div className="flex items-start space-x-3">
                    <FiInfo className="mt-0.5 h-5 w-5 flex-shrink-0 text-on-surface-variant" />
                    <div className="text-sm text-on-surface-variant">
                      <p className="mb-2">
                        By uploading content to Root Things, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                      <p>
                        You confirm that you have the rights to distribute this content and that it does not violate any laws or third-party rights.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push("/modules")}
                    className="btn-outline"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                    disabled={isUploading || !isValid || !file}
                  >
                    {isUploading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Uploading ({uploadProgress.toFixed(0)}%)
                      </>
                    ) : (
                      <>
                        <FiUpload className="mr-2" />
                        Upload Module
                      </>
                    )}
                  </button>
                </div>
                
                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-variant">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-on-surface-variant">
                      {uploadProgress.toFixed(0)}% complete
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
