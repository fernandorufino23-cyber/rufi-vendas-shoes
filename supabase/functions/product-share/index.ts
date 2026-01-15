import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const productId = url.searchParams.get('id')
    
    if (!productId) {
      return new Response('Product ID required', { status: 400 })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (error || !product) {
      return new Response('Product not found', { status: 404 })
    }

    // URL base do site
    const siteUrl = Deno.env.get('SITE_URL') || 'https://id-preview--28d0ebac-1ef5-489a-9abb-ee19d4fe595d.lovable.app'
    
    // Gera HTML com meta tags Open Graph para o Facebook
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${product.name} - RufiVendas</title>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product">
  <meta property="og:url" content="${siteUrl}/?product=${productId}">
  <meta property="og:title" content="🔥 ${product.name} - ${product.price.toLocaleString('pt-AO')} Kz">
  <meta property="og:description" content="${product.description || 'Confira este produto incrível!'} 📱 WhatsApp: +244 935 126 871">
  <meta property="og:image" content="${product.image || siteUrl + '/favicon.png'}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="product:price:amount" content="${product.price}">
  <meta property="product:price:currency" content="AOA">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="🔥 ${product.name} - ${product.price.toLocaleString('pt-AO')} Kz">
  <meta name="twitter:description" content="${product.description || 'Confira este produto incrível!'}">
  <meta name="twitter:image" content="${product.image || siteUrl + '/favicon.png'}">
  
  <!-- Redirect to main site -->
  <meta http-equiv="refresh" content="0;url=${siteUrl}/?product=${productId}">
</head>
<body>
  <p>Redirecionando para <a href="${siteUrl}/?product=${productId}">RufiVendas</a>...</p>
</body>
</html>`

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
})
