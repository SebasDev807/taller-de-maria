import { mockProducts } from "@/lib/mockData";
import {
  AdminPageHeader,
  DailyReflectionWidget,
  StockAlertsWidget,
  RecentProductsWidget,
  CategoriesWidget,
} from "@/components";

export default function AdminDashboard() {

  return (
    <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
      <AdminPageHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <DailyReflectionWidget />
        <StockAlertsWidget />
        <RecentProductsWidget products={mockProducts} />
        <CategoriesWidget />
      </div>
    </main>
  );
}
