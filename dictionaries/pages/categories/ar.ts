const dictionary = {
  "categoriesPage": {
    "title": "الأقسام",
    "desc": "رتب منتجاتك داخل أقسام بسيطة وواضحة.",
    "noStore": "ما كاين حتى متجر مربوط بهذا الحساب حاليا.",
    "overview": {
      "title": "كل الأقسام",
      "countPrefix": "عندك",
      "countSuffix": "قسم."
    },
    "stats": {
      "totalCategories": {
        "title": "الأقسام",
        "meta": "جميع الأقسام في متجرك"
      },
      "activeCategories": {
        "title": "فيها منتجات",
        "meta": "أقسام فيها منتجات مربوطة"
      },
      "mostPopular": {
        "title": "أهم قسم",
        "meta": "القسم اللي فيه أكثر منتجات",
        "empty": "مازال ما كاين حتى قسم بارز"
      },
      "totalProductsLinked": {
        "title": "المنتجات داخلها",
        "meta": "منتجات مربوطة بالأقسام"
      }
    },
    "filters": {
      "label": "فلاتر",
      "export": "تصدير",
      "all": "الكل",
      "withProducts": "فيها منتجات",
      "empty": "فارغة"
    },
    "table": {
      "name": "القسم",
      "products": "المنتجات",
      "status": "الحالة",
      "date": "الإنشاء",
      "actions": "الإجراءات",
      "active": "نشط",
      "emptyStatus": "فارغ",
      "empty": "مازال ما كاين حتى قسم. أضف أول قسم."
    },
    "pagination": {
      "showing": "عرض",
      "of": "من أصل",
      "page": "الصفحة",
      "prev": "السابق",
      "next": "التالي"
    },
    "tip": {
      "title": "نصيحة بسيطة للأقسام",
      "body": "استعمل أسماء واضحة للأقسام باش الزبون يلقى المنتج بسرعة داخل متجرك.",
      "cta": "عرض التحليلات"
    },
    "dialog": {
      "trigger": "إضافة قسم",
      "title": "إنشاء قسم جديد",
      "description": "أضف قسم جديد باش تنظم منتجات متجرك بطريقة أوضح.",
      "nameLabel": "اسم القسم",
      "namePlaceholder": "مثال: إلكترونيات",
      "slugHint": "الرابط الداخلي يتولد تلقائيا من اسم القسم.",
      "submit": "حفظ القسم"
    },
    "actions": {
      "srOnly": "فتح القائمة",
      "menuLabel": "الإجراءات",
      "edit": "تعديل",
      "delete": "حذف",
      "editTitle": "تعديل القسم",
      "editDescription": "بدل اسم القسم وسيتم تحديث البيانات المرتبطة به تلقائيا.",
      "nameLabel": "اسم القسم",
      "save": "حفظ",
      "cancel": "إلغاء",
      "deleteTitle": "حذف القسم",
      "deleteDescription": "هذا القسم راح يتحذف من التنظيم الحالي. المنتجات تبقى موجودة داخل المتجر.",
      "deleteConfirm": "حذف القسم"
    },
    "messages": {
      "nameRequired": "اسم القسم مطلوب.",
      "duplicateName": "كاين قسم مشابه لهذا الاسم داخل متجرك.",
      "createFailed": "تعذر إنشاء القسم. حاول مرة أخرى.",
      "updateFailed": "تعذر تحديث القسم. حاول مرة أخرى.",
      "deleteFailed": "تعذر حذف القسم. حاول مرة أخرى."
    }
  }
} as const;

export default dictionary;
