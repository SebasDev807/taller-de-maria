"use client";

import { useState } from "react";
import { formatCurrency } from "@/helpers";
import { updateOrderStatus, deleteOrder } from "@/actions/order.actions";
import { OrderStatus } from "@/models/order/order.interface";

type OrderItem = {
    name: string;
    price: number;
    quantity: number;
};

type OrderData = {
    id: string;
    user: { name: string; email: string };
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
};

export const OrdersTable = ({ initialOrders }: { initialOrders: OrderData[] }) => {
    const [orders, setOrders] = useState<OrderData[]>(initialOrders);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        setLoadingId(orderId);
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("No se pudo actualizar el estado del pedido.");
        } finally {
            setLoadingId(null);
        }
    };

    const handleDelete = async (orderId: string) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.")) return;
        
        setLoadingId(orderId);
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("No se pudo eliminar el pedido.");
        } finally {
            setLoadingId(null);
        }
    };

    const getStatusBadge = (status: OrderStatus) => {
        switch (status) {
            case "pending":
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendiente</span>;
            case "completed":
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completado</span>;
            case "cancelled":
                return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Cancelado</span>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-surface-container overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-surface-container-low border-b border-surface-container text-on-surface-variant font-label-md">
                        <tr>
                            <th className="px-4 py-3">Fecha / ID</th>
                            <th className="px-4 py-3">Usuario</th>
                            <th className="px-4 py-3">Artículos</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-on-surface-variant">
                                    No hay pedidos registrados.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-primary">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-on-surface-variant mt-1">
                                            {order.id.slice(-6)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-on-surface">{order.user.name}</div>
                                        <div className="text-xs text-on-surface-variant">{order.user.email}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <ul className="text-xs text-on-surface-variant max-w-[200px] list-disc list-inside">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="truncate" title={`${item.name} (x${item.quantity})`}>
                                                    {item.name} (x{item.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-primary">
                                        {formatCurrency(order.total)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(order.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            disabled={loadingId === order.id}
                                            className="text-xs border border-outline-variant rounded p-1 bg-surface"
                                        >
                                            <option value="pending">Pendiente</option>
                                            <option value="completed">Completado</option>
                                            <option value="cancelled">Cancelado</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            disabled={loadingId === order.id}
                                            className="text-error hover:bg-error/10 p-1 rounded transition-colors disabled:opacity-50"
                                            title="Eliminar pedido"
                                        >
                                            <span className="material-symbols-outlined text-[18px] align-middle">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
