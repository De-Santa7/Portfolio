"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personal } from "@/data/portfolio";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("#hero")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="text-sm font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors duration-200"
          >
            {personal.shortName}
            <span className="text-accent">.</span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-sm text-gray-500 hover:text-gray-900 capitalize transition-colors duration-200"
              >
                {label}
              </button>
            ))}
            <motion.button
              onClick={() => scrollTo("#contact")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent-hover transition-colors duration-200 shadow-[0_2px_12px_rgba(249,115,22,0.3)]"
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed right-0 top-0 bottom-0 z-50 w-72 bg-white border-l border-gray-200 flex flex-col p-8 shadow-[0_0_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-sm font-bold text-gray-900">
                  {personal.shortName}<span className="text-accent">.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:text-gray-900 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map(({ label, href }, i) => (
                  <motion.button
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(href)}
                    className="text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-orange-50 transition-all duration-200 capitalize"
                  >
                    {label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-8">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-hover transition-colors duration-200"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
