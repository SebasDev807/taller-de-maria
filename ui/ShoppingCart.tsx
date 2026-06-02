"use client"

import { useCart } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ShoppingCart = () => {

    const [mounted, setMounted] = useState(false);
    const { items, updateQuantity, removeItem, totalItems, subtotal } = useCart();

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTotalItems = mounted ? totalItems() : 0;
    const currentSubtotal = mounted ? subtotal() : 0;
    const currentItems = mounted ? items : [];


    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-12 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-7 flex flex-col gap-md">
                {!mounted || currentItems.length === 0 ? (
                    <div className="bg-surface-container-lowest p-xl rounded-lg ambient-shadow text-center">
                        <p className="font-body-lg text-on-surface-variant">Tu carrito está vacío.</p>
                    </div>
                ) : (
                    currentItems.map((item) => (
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
                            <span>Subtotal ({currentTotalItems} {currentTotalItems === 1 ? 'artículo' : 'artículos'})</span>
                            <span className="text-primary font-medium">${currentSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Envío</span>
                            <span className="text-on-surface-variant italic">Por coordinar</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-surface-container-high pt-sm mb-lg">
                        <span className="font-headline-md text-headline-md text-primary">Total Estimado</span>
                        <span className="font-headline-lg text-headline-lg text-primary">${currentSubtotal.toFixed(2)}</span>
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
    )
}