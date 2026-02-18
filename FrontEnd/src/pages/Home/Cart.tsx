import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  return (
    <div className="cart-page">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="cart-header">
        <h1>Meu Carrinho</h1>
        <button className="continue-buying" onClick={() => navigate('/')}>
          Continuar Comprando
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Seu carrinho está vazio :</p>
          <button onClick={() => navigate('/')}>Ver Produtos</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item-card">
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="unit-price">R$ {item.preco.toLocaleString('pt-BR')}</p>
                  <div className="quantity-controls">
                    <span>Qtd: {item.quantidade}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="subtotal">R$ {(item.preco * item.quantidade).toLocaleString('pt-BR')}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-box">
            <h2>Resumo</h2>
            <div className="summary-row">
              <span>Valor dos Produtos:</span>
              <span>R$ {total.toLocaleString('pt-BR')}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>R$ {total.toLocaleString('pt-BR')}</span>
            </div>
            <button className="btn-finish" onClick={() => setModalOpen(true)}>
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;