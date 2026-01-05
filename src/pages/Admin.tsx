import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, Save, X, Star, ShoppingBag, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

type ProductFormData = Omit<Product, 'id'>;

const emptyProduct: ProductFormData = {
  name: '',
  price: 0,
  originalPrice: undefined,
  category: 'tenis',
  image: '',
  description: '',
  sizes: [],
  featured: false,
};

// Credenciais fixas
const ADMIN_USER = 'Rufino';
const ADMIN_PASS = 'Rufino@123';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyProduct);
  const [sizesInput, setSizesInput] = useState('');

  // Estado de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUser('');
    setLoginPass('');
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      image: product.image,
      description: product.description,
      sizes: product.sizes,
      featured: product.featured,
    });
    setSizesInput(product.sizes.join(', '));
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData(emptyProduct);
    setSizesInput('');
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name || formData.price <= 0) {
      toast({
        title: 'Erro',
        description: 'Preencha o nome e preço do produto.',
        variant: 'destructive',
      });
      return;
    }

    const sizes = sizesInput.split(',').map(s => s.trim()).filter(Boolean);
    const productData = { ...formData, sizes };

    if (editingId) {
      updateProduct(editingId, productData);
      toast({ title: 'Produto atualizado!', description: formData.name });
    } else {
      addProduct(productData);
      toast({ title: 'Produto adicionado!', description: formData.name });
    }

    setIsEditing(false);
    setEditingId(null);
    setFormData(emptyProduct);
    setSizesInput('');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir "${name}"?`)) {
      deleteProduct(id);
      toast({ title: 'Produto excluído!', description: name });
    }
  };

  // Tela de Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-card rounded-xl border border-border p-8 shadow-card">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl tracking-wider">
              RUFI<span className="text-gradient">VENDAS</span>
            </span>
          </div>

          <h2 className="font-display text-2xl text-center mb-6">
            PAINEL <span className="text-gradient">ADMIN</span>
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label>Usuário</Label>
              <Input
                value={loginUser}
                onChange={e => setLoginUser(e.target.value)}
                placeholder="Digite seu usuário"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Senha</Label>
              <Input
                type="password"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                placeholder="Digite sua senha"
                className="mt-1.5"
              />
            </div>

            {loginError && (
              <p className="text-destructive text-sm text-center">{loginError}</p>
            )}

            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
              <LogIn className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              ← Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="font-display text-xl md:text-2xl">
                PAINEL <span className="text-gradient">ADMIN</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isEditing && (
              <Button onClick={handleNew} className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Novo Produto</span>
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isEditing ? (
          /* Form */
          <div className="max-w-2xl mx-auto bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl">
                {editingId ? 'EDITAR' : 'NOVO'} <span className="text-gradient">PRODUTO</span>
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-5">
              <div>
                <Label>Nome do Produto</Label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Air Max Thunder"
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preço (Kz)</Label>
                  <Input
                    type="number"
                    value={formData.price || ''}
                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="15500"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Preço Original (opcional)</Label>
                  <Input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={e => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || undefined })}
                    placeholder="19900"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenis">Tênis</SelectItem>
                    <SelectItem value="sapatos">Sapatos</SelectItem>
                    <SelectItem value="acessorios">Acessórios</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Imagem do Produto</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1.5"
                />
                {formData.image && (
                  <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição do produto..."
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div>
                <Label>Tamanhos (separados por vírgula)</Label>
                <Input
                  value={sizesInput}
                  onChange={e => setSizesInput(e.target.value)}
                  placeholder="38, 39, 40, 41, 42"
                  className="mt-1.5"
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={checked => setFormData({ ...formData, featured: checked })}
                />
                <Label className="flex items-center gap-2 cursor-pointer">
                  <Star className="w-4 h-4 text-primary" />
                  Produto em destaque
                </Label>
              </div>

              <Button onClick={handleSave} className="w-full bg-gradient-primary hover:opacity-90 mt-4">
                <Save className="w-4 h-4 mr-2" />
                Salvar Produto
              </Button>
            </div>
          </div>
        ) : (
          /* Product List */
          <div>
            <h2 className="font-display text-2xl mb-6">
              PRODUTOS <span className="text-gradient">({products.length})</span>
            </h2>
            
            {products.length > 0 ? (
              <div className="grid gap-4">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="font-display text-xs text-muted-foreground">RUFI</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{product.name}</h3>
                        {product.featured && (
                          <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.category === 'tenis' ? 'Tênis' : product.category === 'sapatos' ? 'Sapatos' : 'Acessórios'}
                      </p>
                    </div>
                    
                    <div className="text-right mr-4">
                      <div className="font-display text-lg text-gradient">
                        {product.price.toLocaleString('pt-AO')} Kz
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString('pt-AO')} Kz
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-xl border border-border">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Nenhum produto cadastrado ainda.</p>
                <Button onClick={handleNew} className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Produto
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
