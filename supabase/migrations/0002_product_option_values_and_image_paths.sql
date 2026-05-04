alter table "product_options"
add column if not exists "values" jsonb not null default '[]'::jsonb;

alter table "product_images"
add column if not exists "storage_path" text;
