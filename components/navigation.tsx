'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { Zap, Menu, X } from 'lucide-react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/studios', label: 'Find Studios' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/list-your-space', label: 'For Owners' },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">OneTime</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    isActive(link.href) ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className={`text-sm font-medium ${isActive('/dashboard') ? 'text-white' : 'text-gray-400'}`}>
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium text-gray-400 hover:text-white px-4 py-2">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-5 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-100">
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 md:hidden">
          <div className="mx-4 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive(link.href) ? 'bg-white/10 text-white' : 'text-gray-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-3" />
            {isSignedIn ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-white">
                Dashboard
              </Link>
            ) : (
              <div className="space-y-2 p-2">
                <SignInButton mode="modal">
                  <button className="w-full py-3 text-center text-gray-400">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full py-3 bg-white text-black rounded-xl font-semibold">Get Started</button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
