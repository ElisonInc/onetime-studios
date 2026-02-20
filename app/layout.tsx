import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneTime Studios | Book Studio Space Instantly",
  description: "Find and book professional recording studios, photo studios, and rehearsal spaces in under 2 minutes. Real availability. Instant confirmation.",
  keywords: ["studio rental", "recording studio", "photo studio", "rehearsal space", "book studio"],
  openGraph: {
    title: "OneTime Studios | Book Studio Space Instantly",
    description: "Find and book professional studios in under 2 minutes",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If Clerk is not configured, render without provider
  if (!publishableKey) {
    return (
      <html lang="en" className="dark">
        <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white min-h-screen`}>
          <Navigation />
          <main className="pt-16 md:pt-20">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#000000',
          colorText: '#ffffff',
          colorInputBackground: '#1a1a1a',
          colorInputText: '#ffffff',
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white min-h-screen antialiased`}>
          <Navigation />
          <main className="pt-16 md:pt-20">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
