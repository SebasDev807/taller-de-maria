import { mockProducts, mockDailyContent } from "@/lib/mockData";
import {
  AdminPageHeader,
  DailyReflectionWidget,
  StockAlertsWidget,
  RecentProductsWidget,
  CategoriesWidget,
} from "@/components/admin";

export default function AdminDashboard() {
  const evangelio = mockDailyContent.find((content) => content.type === "evangelio");
  const oracion = mockDailyContent.find((content) => content.type === "oracion");

  return (
    <main className="flex-1 md:ml-64 p-margin-mobile md:p-margin-desktop min-h-screen">
      <AdminPageHeader />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <DailyReflectionWidget evangelio={evangelio} oracion={oracion} />
        <StockAlertsWidget />
        <RecentProductsWidget products={mockProducts} />
        <CategoriesWidget />
      </div>
    </main>
  );
}
