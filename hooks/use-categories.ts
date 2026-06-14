import { useState, useTransition } from "react";
import { createCategory, deleteCategory, updateCategory } from "@/actions/category.actions";

export const useCategories = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

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

  const handleEditMode = (id: string, currentName: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(currentName);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditingCategoryName("");
  };

  const handleUpdate = (id: string) => {
    if (!editingCategoryName.trim()) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", editingCategoryName);
      const result = await updateCategory(id, formData);

      if (result.success) {
        setEditingCategoryId(null);
        setEditingCategoryName("");
      } else {
        alert(result.error);
      }
    });
  };

  return {
    isAdding,
    setIsAdding,
    newCategoryName,
    setNewCategoryName,
    editingCategoryId,
    editingCategoryName,
    setEditingCategoryName,
    isPending,
    handleSave,
    handleDelete,
    handleCancel,
    handleEditMode,
    handleCancelEdit,
    handleUpdate,
  };
};
