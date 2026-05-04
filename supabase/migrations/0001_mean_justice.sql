ALTER TABLE "audit_logs" ALTER COLUMN "store_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "storage_path" text;--> statement-breakpoint
ALTER TABLE "product_options" ADD COLUMN "values" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_pic" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_slug_unique" UNIQUE("store_id","slug");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number");