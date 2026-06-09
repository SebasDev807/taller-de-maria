export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: string;
    stock: number;
    price: number;
    imageUrl: string;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
}