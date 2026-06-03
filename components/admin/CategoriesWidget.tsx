/**
 * Displays the categories widget on the admin dashboard,
 * allowing the user to manage product categories.
 *
 * @returns The rendered CategoriesWidget component.
 */
export const CategoriesWidget = () => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-surface-container-high">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md text-[20px] text-primary font-bold">Categorías</h3>
        <button className="text-secondary hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </div>

      <ul className="flex flex-col gap-1">
        {[
          "Rosarios y Devocionales",
          "Arte Sacro",
          "Libros y Biblias",
          "Velas y Aromas",
        ].map((category, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 rounded hover:bg-surface-container-low transition-colors group border-b border-surface-container-high last:border-0"
          >
            <span className="font-body-md text-body-md text-on-surface">{category}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-on-surface-variant hover:text-primary cursor-pointer p-1">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
