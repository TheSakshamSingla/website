"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiGithub } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    
    try {
      // Here you would typically call your API to register the user
      // For example: await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) })
      console.log("Signup data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page after successful signup
      router.push("/auth/login?registered=true");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:px-12">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-on-primary font-bold text-xl">RT</span>
              </div>
              <span className="text-xl font-bold text-on-surface">Root Things</span>
            </Link>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-3xl font-bold"
            >
              Create your account
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-on-surface-variant"
            >
              Join the Root Things community
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Social Sign Up */}
            <div className="mb-6">
              <button 
                type="button" 
                className="flex w-full items-center justify-center rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface hover:bg-surface-variant transition-colors"
              >
                <FiGithub className="mr-2 h-5 w-5" />
                Sign up with GitHub
              </button>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-surface px-2 text-on-surface-variant">Or continue with</span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiUser className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="block w-full rounded-lg border border-outline-variant bg-surface py-2 pl-10 pr-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiMail className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="block w-full rounded-lg border border-outline-variant bg-surface py-2 pl-10 pr-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-on-surface mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiLock className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="block w-full rounded-lg border border-outline-variant bg-surface py-2 pl-10 pr-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-on-surface mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiLock className="h-5 w-5 text-on-surface-variant" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className="block w-full rounded-lg border border-outline-variant bg-surface py-2 pl-10 pr-3 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block relative lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-tertiary opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-xl text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6"
            >
              Unlock the full potential of your Android device
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 opacity-90"
            >
              Join our community of Android enthusiasts and developers to discover, share, and download the latest rooting modules, scripts, and kernels.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FiDownload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm opacity-80">Downloads</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5K+</div>
                  <div className="text-sm opacity-80">Users</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
