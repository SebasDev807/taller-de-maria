"use client";

import type { CategoryData } from "@/actions/types";
import { useCategories } from "@/hooks";

interface Props {
  initialCategories: CategoryData[];
}

export function CategoriesClient({ initialCategories }: Props) {
  const {
    isAdding,
    setIsAdding,
    newCategoryName,
    setNewCategoryName,
    isPending,
    handleSave,
    handleDelete,
    handleCancel,
  } = useCategories();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-md text-[20px] text-primary font-bold">Categorías</h3>
        <button
          onClick={() => setIsAdding(true)}
          disabled={isPending || isAdding}
          className="text-secondary hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
        >
          <span className="material-symbols-outlined">add_circle</span>
        </button>
      </div>

      <ul className="flex flex-col gap-1">
        {initialCategories.length === 0 && !isAdding ? (
          <li className="p-3 text-on-surface-variant text-sm">No hay categorías</li>
        ) : (
          initialCategories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between p-3 rounded hover:bg-surface-container-low transition-colors group border-b border-surface-container-high last:border-0"
            >
              <span className="font-body-md text-body-md text-on-surface">{category.name}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-on-surface-variant hover:text-primary cursor-pointer p-1 disabled:opacity-50">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={isPending}
                  className="text-on-surface-variant hover:text-error cursor-pointer p-1 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </li>
          ))
        )}

        {isAdding && (
          <li className="flex items-center justify-between p-3 rounded bg-surface-container-low border-b border-surface-container-high last:border-0">
            <input
              type="text"
              autoFocus
              placeholder="Ej: Rosarios"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setIsAdding(false);
                  setNewCategoryName("");
                }
              }}
              className="font-body-md text-body-md text-on-surface bg-transparent outline-none w-full border-b border-primary/50 focus:border-primary transition-colors mr-4 py-1"
              disabled={isPending}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isPending}
                className="text-primary hover:text-primary/80 cursor-pointer p-1 disabled:opacity-50"
              >
                {isPending ? (
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                )}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewCategoryName("");
                }}
                disabled={isPending}
                className="text-error hover:text-error/80 cursor-pointer p-1 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
