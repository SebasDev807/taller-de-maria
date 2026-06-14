import { getCategories } from "@/actions/category.actions";
import { CategoriesClient } from "./CategoriesClient";

/**
 * Displays the categories widget on the admin dashboard,
 * allowing the user to manage product categories.
 *
 * @returns The rendered CategoriesWidget component.
 */
export const CategoriesWidget = async () => {
  const result = await getCategories();
  const categories = result.success ? result.data : [];

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-surface-container-high">
      <CategoriesClient initialCategories={categories} />
    </section>
  );
};
