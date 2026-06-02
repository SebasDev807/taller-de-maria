import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-xl px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter bg-surface border-t border-surface-container-high">
      {/* Brand / Copyright */}
      <div className="text-center md:text-left">
        <h5 className="font-headline-sm text-headline-md md:text-headline-sm text-primary mb-2">
          Taller De Maria
        </h5>
        <p className="font-body-md text-body-md text-on-surface-variant">
          © {new Date().getFullYear()} Taller De Maria. Handcrafted Devotion.
        </p>
      </div>
      
      {/* Links */}
      <nav className="flex flex-wrap justify-center gap-6">
        <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity underline decoration-secondary underline-offset-4">
          Privacy Policy
        </Link>
        <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity underline decoration-secondary underline-offset-4">
          Terms of Service
        </Link>
        <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity underline decoration-secondary underline-offset-4">
          Shipping & Returns
        </Link>
        <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity underline decoration-secondary underline-offset-4">
          Contact
        </Link>
      </nav>
    </footer>
  );
};
