const dictionary = {
  "categoriesPage": {
    "title": "Categories",
    "desc": "Keep your products grouped in a simple way.",
    "noStore": "No store is linked to this account right now.",
    "overview": {
      "title": "All Categories",
      "countPrefix": "You have",
      "countSuffix": "categories."
    },
    "stats": {
      "totalCategories": {
        "title": "Categories",
        "meta": "All groups in your store"
      },
      "activeCategories": {
        "title": "With Products",
        "meta": "Categories that already have products"
      },
      "mostPopular": {
        "title": "Top Category",
        "meta": "The category with the most products",
        "empty": "No top category yet"
      },
      "totalProductsLinked": {
        "title": "Products Inside",
        "meta": "Products linked to categories"
      }
    },
    "filters": {
      "label": "Filters",
      "export": "Export",
      "all": "All",
      "withProducts": "With products",
      "empty": "Empty"
    },
    "table": {
      "name": "Category",
      "products": "Products",
      "status": "Status",
      "date": "Created",
      "actions": "Actions",
      "active": "Active",
      "emptyStatus": "Empty",
      "empty": "No categories yet. Add your first category."
    },
    "pagination": {
      "showing": "Showing",
      "of": "of",
      "page": "Page",
      "prev": "Prev",
      "next": "Next"
    },
    "tip": {
      "title": "Simple category tip",
      "body": "Use clear category names so customers can find products faster inside your store.",
      "cta": "View analytics"
    },
    "dialog": {
      "trigger": "Add Category",
      "title": "Create New Category",
      "description": "Add a category to organize products inside your store.",
      "nameLabel": "Category Name",
      "namePlaceholder": "e.g. Electronics",
      "slugHint": "The internal link will be generated automatically from the category name.",
      "submit": "Save Category"
    },
    "actions": {
      "srOnly": "Open menu",
      "menuLabel": "Actions",
      "edit": "Edit",
      "delete": "Delete",
      "editTitle": "Edit category",
      "editDescription": "Change the category name and the related internal data will update automatically.",
      "nameLabel": "Category name",
      "save": "Save",
      "cancel": "Cancel",
      "deleteTitle": "Delete category",
      "deleteDescription": "This category will be removed from the current organization. Products will stay in your store.",
      "deleteConfirm": "Delete category"
    },
    "messages": {
      "nameRequired": "Category name is required.",
      "duplicateName": "A similar category already exists in your store.",
      "createFailed": "Failed to create category. Please try again.",
      "updateFailed": "Failed to update category. Please try again.",
      "deleteFailed": "Failed to delete category. Please try again."
    }
  }
} as const;

export default dictionary;
