import { getProducts } from "@/actions/product.actions";
import {
  DashboardHeader,
  DailyReflectionWidget,
  StockAlertsWidget,
  RecentProductsWidget,
  CategoriesWidget,
} from "@/components";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <DailyReflectionWidget />
        <StockAlertsWidget />
        <RecentProductsWidget products={products} />
        <CategoriesWidget />
      </div>
    </main>
  );
}
