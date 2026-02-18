import { createContext, useState, useContext, type ReactNode } from 'react';
import type React from 'react';

interface CartItem {
  id: number;
  name: string;
  preco: number;
  imageUrl: string;
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const toastStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderLeft: '4px solid #ff3131',
  color: '#fff',
  padding: '14px 20px',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: '600',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
  animation: 'slideIn 0.3s ease',
};

const Toast = ({ message }: { message: string }) => (
  <>
    <style>{`
      @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `}</style>
    <div style={toastStyle}>
      <span style={{ color: '#ff3131', fontSize: '1.1rem' }}>✓</span>
      {message}
    </div>
  </>
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...product, quantidade: 1 }];
    });
    showToast('Produto adicionado ao carrinho!');
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
      {children}
      {toast && <Toast message={toast} />}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};