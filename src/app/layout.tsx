import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Root Things - Android Rooting Community",
  description: "A community-driven platform for Android rooting enthusiasts, developers, and users looking to get the most out of their devices.",
  keywords: "android, root, rooting, custom rom, kernel, modules, scripts, magisk, xposed",
  authors: [{ name: "Root Things Team" }],
  creator: "Root Things",
  publisher: "Root Things",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rootthings.com",
    title: "Root Things - Android Rooting Community",
    description: "The ultimate destination for rooted Android users and developers",
    siteName: "Root Things",
  },
  twitter: {
    card: "summary_large_image",
    title: "Root Things - Android Rooting Community",
    description: "The ultimate destination for rooted Android users and developers",
    creator: "@rootthings",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
