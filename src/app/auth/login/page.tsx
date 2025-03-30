"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiGithub, FiAlertCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  useEffect(() => {
    // Check if user just registered
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setShowSuccessMessage(true);
      
      // Hide the message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Here you would typically call your API to authenticate the user
      // For example: await signIn('credentials', { redirect: false, ...data })
      console.log("Login data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard after successful login
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
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
              Welcome back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-on-surface-variant"
            >
              Sign in to your account
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Success Message */}
            {showSuccessMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 rounded-lg bg-primary-container p-4 text-on-primary-container"
              >
                <div className="flex">
                  <FiAlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Account created successfully!</p>
                    <p className="text-sm">You can now sign in with your credentials.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Social Login */}
            <div className="mb-6">
              <button 
                type="button" 
                className="flex w-full items-center justify-center rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface hover:bg-surface-variant transition-colors"
              >
                <FiGithub className="mr-2 h-5 w-5" />
                Sign in with GitHub
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

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    {...register("rememberMe")}
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-on-surface-variant">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot your password?
                  </Link>
                </div>
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
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-on-surface-variant">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Sign up
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
              Welcome back to Root Things
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-8 opacity-90"
            >
              Access your favorite modules, scripts, and kernels. Stay connected with the Android rooting community.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="rounded-lg bg-white/10 p-4">
                <div className="text-lg font-medium mb-1">Latest Modules</div>
                <p className="text-sm opacity-80">Explore the newest additions to our module library.</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <div className="text-lg font-medium mb-1">Community Updates</div>
                <p className="text-sm opacity-80">Check out what's happening in the rooting community.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
