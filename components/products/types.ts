export type ImageUploadCopy = {
  title: string
  dragDrop: string
  hint: string
  select: string
  primary: string
  empty: string
}

export type ProductImageItem = {
  id?: string
  url: string
  storagePath?: string | null
  isPrimary: boolean
}

export type VariantBuilderCopy = {
  addOption: string
  optionName: string
  type: string
  values: string
  addValue: string
  required: string
  variant: string
  price: string
  stock: string
  remove: string
}

export type ProductFormPageCopy = {
  title: string
  desc: string
  noStore: string
  back: string
  details: string
  name: string
  namePlaceholder: string
  descriptionLabel: string
  descriptionPlaceholder: string
  category: string
  noCategory: string
  price: string
  stock: string
  threshold: string
  status: string
  sku: string
  skuHint: string
  create: string
  active: string
  draft: string
  scheduled: string
  outOfStock: string
  errorTitle: string
  mediaTitle: string
  mediaAddUrl: string
  pricingTitle: string
  comparePrice: string
  statusTitle: string
  statusActive: string
  statusLive: string
  categoryTitle: string
  createCategory: string
  optionsTitle: string
  optionsBeta: string
  optionsPlaceholder: string
  seoHelpTitle: string
  seoHelpDesc: string
  seoHelpBtn: string
  saveDraft: string
  publish: string
  uploadCopy: ImageUploadCopy
  variantCopy: VariantBuilderCopy
}
