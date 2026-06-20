import { getOrders } from "@/actions/order.actions";
import { OrdersTable } from "@/components/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gestión de Pedidos - Admin | Taller De Maria",
    description: "Administra los pedidos realizados por WhatsApp.",
};

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Pedidos por WhatsApp</h1>
                    <p className="font-body-md text-on-surface-variant">
                        Gestiona los pedidos realizados por los clientes. Actualiza su estado o elimínalos según sea necesario.
                    </p>
                </div>
            </div>

            <OrdersTable initialOrders={orders} />
        </div>
    );
}
