"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutShellProps {
  children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "Inventario", href: "#", icon: "inventory_2" },
    { name: "Pedidos", href: "#", icon: "receipt_long" },
    { name: "Clientes", href: "#", icon: "group" },
    { name: "Ajustes", href: "#", icon: "settings" },
  ];

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col relative">
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-surface-container-low border-b border-outline-variant sticky top-0 z-30 w-full">
        <div className="flex flex-col">
          <h1 className="font-headline-md text-[20px] leading-tight text-primary font-bold">Admin Portal</h1>
          <p className="font-label-sm text-[10px] text-on-surface-variant">Management Console</p>
        </div>
        <button
          onClick={handleToggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-variant transition-colors text-primary"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[28px]">
            {isSidebarOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Backdrop for Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <nav
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-outline-variant flex flex-col pt-8 md:pt-20 z-50 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        {/* Mobile Sidebar Close Button */}
        <div className="md:hidden absolute top-4 right-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Brand Header */}
        <div className="px-6 pb-6 md:pb-12">
          <h1 className="font-headline-md text-headline-md text-primary mb-1">Admin Portal</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Management Console</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col flex-1 mt-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/admin");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`p-4 flex items-center gap-2 transition-all duration-150 border-r-4 ${
                  isActive
                    ? "text-secondary font-bold border-secondary bg-surface-container-high translate-x-1"
                    : "text-on-surface-variant border-transparent hover:bg-surface-variant"
                }`}
              >
                <span 
                  className="material-symbols-outlined" 
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
                >
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Admin User Avatar Section */}
        <div className="p-6 border-t border-outline-variant mt-auto flex items-center gap-4">
          <img
            alt="Admin User Avatar"
            className="w-10 h-10 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWMUDFdIL_z_iEYh8URq7xMoA7DtKs-Ma0caSTB8HfJig_8ybbrRzHvTjyZ252x-7qXX5TRdMTnG8_Za0K-fEgOfxK7A-gswuHmeeMCC7WK60tP6iFqjmu8IhHZZ2A-kijWON-DxKK26yPNArojLfyscWkACoNtgRdqft-urU89knO-pkrfIi4E8NjsmwsgM44cxgFCdPfCSEEFr9H9Drn7wA4u7ydGs6hhQycvaszta5RgmWrqZPTUD1LcT1HIffYJdZkscxIitA"
          />
          <div className="min-w-0">
            <p className="font-label-md text-label-md text-primary truncate">Admin User</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">admin@tallerdemaria.com</p>
          </div>
        </div>
      </nav>

      {/* Main Content Area Layout */}
      <div className="flex-1 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
