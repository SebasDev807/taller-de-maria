import { useState, useTransition } from "react";
import { createCategory, deleteCategory } from "@/actions/category.actions";

export const useCategories = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!newCategoryName.trim()) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", newCategoryName);
      const result = await createCategory(formData);

      if (result.success) {
        setIsAdding(false);
        setNewCategoryName("");
      } else {
        alert(result.error);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    startTransition(async () => {
      const result = await deleteCategory(id);
      if (!result.success) {
        alert(result.error);
      }
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewCategoryName("");
  };

  return {
    isAdding,
    setIsAdding,
    newCategoryName,
    setNewCategoryName,
    isPending,
    handleSave,
    handleDelete,
    handleCancel,
  };
};
