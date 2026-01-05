import { ShoppingBag, Instagram, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl tracking-wider">
                RUFI<span className="text-gradient">VENDAS</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Os melhores tênis e sapatos com preços imbatíveis. 
              Qualidade, estilo e conforto em cada passo.
            </p>
            
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-display text-lg mb-4">NAVEGAÇÃO</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#categorias" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categorias
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4">CONTATO</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>WhatsApp: +244 935 126 871</li>
              <li>contato@rufivendas.com</li>
              <li>Segunda - Sábado</li>
              <li>9h às 18h</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RufiVendas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
