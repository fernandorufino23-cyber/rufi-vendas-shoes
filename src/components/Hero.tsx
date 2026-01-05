import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroSneaker from '@/assets/hero-sneaker.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-slide-up">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Novidades toda semana</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              SEU ESTILO
              <br />
              <span className="text-gradient">COMEÇA AQUI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Os melhores tênis e sapatos com preços imbatíveis. 
              Qualidade, estilo e conforto em cada passo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <a href="#produtos">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 shadow-glow animate-pulse-glow">
                  Ver Produtos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="#categorias">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-secondary">
                  Explorar Categorias
                </Button>
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <div className="font-display text-3xl md:text-4xl text-gradient">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Produtos</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl text-gradient">2K+</div>
                <div className="text-sm text-muted-foreground mt-1">Clientes</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl text-gradient">⭐ 4.9</div>
                <div className="text-sm text-muted-foreground mt-1">Avaliação</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative hidden lg:block animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <img 
                src={heroSneaker} 
                alt="Tênis em destaque" 
                className="w-full h-auto animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
