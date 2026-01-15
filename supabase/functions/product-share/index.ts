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
    // URL real do site hospedado no Vercel
    const siteUrl = url.searchParams.get('site') || 'https://rufi-vendas-shoes.vercel.app'
    
    console.log('Product share request:', { productId, siteUrl })
    
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
      .maybeSingle()

    console.log('Product fetched:', { product, error })

    if (error || !product) {
      return new Response('Product not found', { status: 404 })
    }

    const priceFormatted = new Intl.NumberFormat('pt-AO').format(product.price)
    
    // URL da imagem do produto - usar a URL direta do Supabase Storage
    const productImage = product.image || `${siteUrl}/favicon.png`
    
    console.log('Product image URL:', productImage)
    
    // Limpar descrição para evitar problemas com caracteres especiais
    const safeDescription = (product.description || 'Confira este produto incrível na RufiVendas!')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
    
    // URL de destino quando alguém clica no link
    const destinationUrl = `${siteUrl}/?product=${productId}`
    
    // Gera HTML com meta tags Open Graph para o Facebook
    const html = `<!DOCTYPE html>
<html lang="pt-BR" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🔥 ${product.name} - ${priceFormatted} Kz | RufiVendas</title>
  
  <!-- Open Graph / Facebook - OBRIGATÓRIOS -->
  <meta property="og:type" content="product">
  <meta property="og:url" content="${destinationUrl}">
  <meta property="og:title" content="🔥 ${product.name} - ${priceFormatted} Kz">
  <meta property="og:description" content="${safeDescription} 📱 WhatsApp: +244 935 126 871">
  <meta property="og:image" content="${productImage}">
  <meta property="og:image:secure_url" content="${productImage}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${product.name}">
  <meta property="og:site_name" content="RufiVendas">
  <meta property="og:locale" content="pt_AO">
  
  <!-- Produto -->
  <meta property="product:price:amount" content="${product.price}">
  <meta property="product:price:currency" content="AOA">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="🔥 ${product.name} - ${priceFormatted} Kz">
  <meta name="twitter:description" content="${safeDescription}">
  <meta name="twitter:image" content="${productImage}">
  
  <!-- Link canónico -->
  <link rel="canonical" href="${destinationUrl}">
  
  <!-- Favicon -->
  <link rel="icon" href="${siteUrl}/favicon.png" type="image/png">
  
  <!-- Redirect automático para o site -->
  <meta http-equiv="refresh" content="1;url=${destinationUrl}">
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      margin: 0;
    }
    img {
      max-width: 300px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      margin-bottom: 20px;
    }
    h1 { margin: 10px 0; font-size: 24px; }
    .price { 
      font-size: 28px; 
      color: #4ade80; 
      font-weight: bold; 
      margin: 10px 0;
    }
    .loading { 
      margin-top: 20px; 
      opacity: 0.7; 
    }
    a {
      color: #4ade80;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <img src="${productImage}" alt="${product.name}" onerror="this.style.display='none'">
  <h1>${product.name}</h1>
  <p class="price">${priceFormatted} Kz</p>
  <p>${safeDescription}</p>
  <p class="loading">Redirecionando para <a href="${destinationUrl}">RufiVendas</a>...</p>
</body>
</html>`

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
})
