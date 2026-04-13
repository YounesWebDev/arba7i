const dictionary = {
  "categoriesPage": {
    "title": "Categories",
    "desc": "Gardez vos produits ranges dans une structure simple.",
    "noStore": "Aucune boutique n'est liee a ce compte pour le moment.",
    "overview": {
      "title": "Toutes les categories",
      "countPrefix": "Vous avez",
      "countSuffix": "categories."
    },
    "stats": {
      "totalCategories": {
        "title": "Categories",
        "meta": "Tous les groupes de votre boutique"
      },
      "activeCategories": {
        "title": "Avec produits",
        "meta": "Categories qui contiennent deja des produits"
      },
      "mostPopular": {
        "title": "Categorie top",
        "meta": "Categorie avec le plus de produits",
        "empty": "Aucune categorie top pour le moment"
      },
      "totalProductsLinked": {
        "title": "Produits dedans",
        "meta": "Produits lies aux categories"
      }
    },
    "filters": {
      "label": "Filtres",
      "export": "Exporter",
      "all": "Toutes",
      "withProducts": "Avec produits",
      "empty": "Vides"
    },
    "table": {
      "name": "Categorie",
      "products": "Produits",
      "status": "Statut",
      "date": "Creation",
      "actions": "Actions",
      "active": "Active",
      "emptyStatus": "Vide",
      "empty": "Aucune categorie pour le moment. Ajoutez votre premiere categorie."
    },
    "pagination": {
      "showing": "Affichage",
      "of": "sur",
      "page": "Page",
      "prev": "Prec",
      "next": "Suiv"
    },
    "tip": {
      "title": "Conseil simple pour les categories",
      "body": "Utilisez des noms clairs pour aider vos clients a trouver les produits plus vite dans votre boutique.",
      "cta": "Voir les analyses"
    },
    "dialog": {
      "trigger": "Ajouter une categorie",
      "title": "Creer une nouvelle categorie",
      "description": "Ajoutez une categorie pour organiser les produits de votre boutique.",
      "nameLabel": "Nom de la categorie",
      "namePlaceholder": "Exemple : Electronique",
      "slugHint": "Le lien interne sera genere automatiquement a partir du nom.",
      "submit": "Enregistrer la categorie"
    },
    "actions": {
      "srOnly": "Ouvrir le menu",
      "menuLabel": "Actions",
      "edit": "Modifier",
      "delete": "Supprimer",
      "editTitle": "Modifier la categorie",
      "editDescription": "Changez le nom de la categorie. Les donnees liees seront mises a jour automatiquement.",
      "nameLabel": "Nom de la categorie",
      "save": "Enregistrer",
      "cancel": "Annuler",
      "deleteTitle": "Supprimer la categorie",
      "deleteDescription": "Cette categorie sera retiree de l'organisation actuelle. Les produits resteront dans la boutique.",
      "deleteConfirm": "Supprimer la categorie"
    },
    "messages": {
      "nameRequired": "Le nom de la categorie est obligatoire.",
      "duplicateName": "Une categorie similaire existe deja dans votre boutique.",
      "createFailed": "Impossible de creer la categorie. Reessayez.",
      "updateFailed": "Impossible de modifier la categorie. Reessayez.",
      "deleteFailed": "Impossible de supprimer la categorie. Reessayez."
    }
  }
} as const;

export default dictionary;
