"use client";

import { useState } from "react";
import Image from "next/image";
import { TopNavBar, Footer } from "@/ui";

const initialCartItems = [
  {
    id: 1,
    name: "Rosario de Madera de Olivo",
    description: "Detalles en plata 925, engarzado a mano.",
    price: 45.00,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB65Y0hCYajU6OwDokuu2Mg6Vk5TNNBMjCZajYKl8u52HzArmU1FUFQvQGF-tK7Fz3W9odp7j9vLzKjmvyhwEWE3iJNc42C7bUQgXhf8_bItrw-brr5FU0ut0sSHDX49UX8fGn701_I9JzhrFMaXjiZoAWW31wYn11Gqdr06bUmx0Dd9BJ32TxhJQLatWoI5oGhRWbAqQkesmAhjniwQffAbA-Mvw6hROdLW4nl8FWaEjgpV92LffWQGcaquZA_vixiFMpo_peTYOE",
    alt: "Handcrafted Rosary",
  },
  {
    id: 2,
    name: "Cruz de San Benito",
    description: "Bronce macizo, 12cm.",
    price: 35.00,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHfnMLMC3B3OwYm4dqTARWEPZBgTIz1b0CItvSQY5Xsvc5AgMYOmqgvUOzN4qtKUd4oKDF5VvFNzmL75DkKYxt-p5fl9egAxSgeHDGpSmVV-FSHjiP6fM2Hlv4C9pgkBB0rrolEzGfQ_KUgoJM0ATv-tvwN7OyW6ExZyyL0-WGGzu4XsZd4XLF247izyEqwF2OE07XycR83yvi0j9Xf4KMIjuy4HDkXIGgS7wmhDfxLRDdvgcojuIk_y3PGbhzYr9rFkBs5DeMel0",
    alt: "San Benito Crucifix",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          // Prevent negative or zero quantity if we want to keep it in the cart, minimum 1
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <TopNavBar />
      <main className="flex-grow pt-[104px] pb-xl px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col">
        <div className="mb-lg">
          <h1 className="font-headline-lg text-headline-lg md:font-headline-xl md:text-headline-xl text-primary tracking-tight">Tu Oratorio</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Revisa los artículos seleccionados antes de coordinar tu entrega.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 flex flex-col gap-md">
            {items.length === 0 ? (
              <div className="bg-surface-container-lowest p-xl rounded-lg ambient-shadow text-center">
                <p className="font-body-lg text-on-surface-variant">Tu carrito está vacío.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-md pb-md border-b border-surface-container-high bg-surface-container-lowest p-sm rounded-lg ambient-shadow">
                  <div className="w-full sm:w-32 h-32 bg-surface-variant rounded overflow-hidden shrink-0 relative">
                    <Image
                      alt={item.alt}
                      src={item.image}
                      className="object-cover"
                      fill
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between py-xs">
                    <div className="flex justify-between items-start gap-sm">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary">{item.name}</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">{item.description}</p>
                      </div>
                      <button
                        aria-label="Eliminar producto"
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-error transition-colors p-xs cursor-pointer"
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300" }}>close</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-sm">
                      <div className="flex items-center border border-outline-variant rounded">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-sm py-xs text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="font-label-md text-label-md px-sm text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-sm py-xs text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <span className="font-headline-md text-headline-md text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 relative">
            <div className="bg-surface-container-lowest rounded-lg ambient-shadow p-md lg:p-lg border border-surface-container-high sticky top-[104px]">
              <h2 className="font-headline-md text-headline-md text-primary mb-md border-b border-surface-container-high pb-sm">Resumen de la Orden</h2>
              <div className="flex flex-col gap-sm font-body-md text-body-md text-on-surface-variant mb-md">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})</span>
                  <span className="text-primary font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-on-surface-variant italic">Por coordinar</span>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-surface-container-high pt-sm mb-lg">
                <span className="font-headline-md text-headline-md text-primary">Total Estimado</span>
                <span className="font-headline-lg text-headline-lg text-primary">${subtotal.toFixed(2)}</span>
              </div>
              {/* WhatsApp Information Box */}
              <div className="bg-surface-container p-sm rounded flex items-start gap-sm mb-md">
                <span className="material-symbols-outlined text-secondary mt-xs" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <div>
                  <p className="font-body-md text-body-md text-on-surface text-sm">
                    Para brindarte una atención reverente y personalizada, finalizaremos los detalles de tu entrega y método de pago directamente por WhatsApp.
                  </p>
                </div>
              </div>
              {/* Checkout Button */}
              <button
                className="w-full bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-label-md text-label-md py-sm px-md rounded flex items-center justify-center gap-sm hover:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                disabled={items.length === 0}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                Finalizar pedido por WhatsApp
              </button>
              <div className="mt-md text-center">
                <span className="font-label-sm text-label-sm text-outline flex items-center justify-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]">lock</span> Pago seguro garantizado
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
