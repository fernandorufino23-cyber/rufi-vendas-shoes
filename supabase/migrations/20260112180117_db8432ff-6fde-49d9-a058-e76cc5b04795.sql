-- Add RLS policies to allow INSERT, UPDATE, and DELETE on products table
-- Since there's no auth system yet, we allow public access (UI is protected by admin credentials)

CREATE POLICY "Anyone can insert products"
ON public.products
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update products"
ON public.products
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete products"
ON public.products
FOR DELETE
USING (true);