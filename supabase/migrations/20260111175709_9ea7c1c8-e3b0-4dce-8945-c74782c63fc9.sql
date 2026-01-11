-- Add colors column to products table
ALTER TABLE public.products 
ADD COLUMN colors text[] DEFAULT '{}'::text[];