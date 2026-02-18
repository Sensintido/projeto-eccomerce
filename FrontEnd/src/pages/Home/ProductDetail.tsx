import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tagIcon from '../../assets/tag.png';
import escudoIcon from '../../assets/escudo.png';
import starIcon from '../../assets/star.png';
import categoriaIcon from '../../assets/descricao.png';
import shoppingCart from '../../assets/shopping cart.png';
import { useCart } from './CartContext';
import Modal from './Modal';
import './ProductDetail.css';

interface Product {
  id: number;
  name: string;
  preco: number;
  precoOriginal?: number;
  desconto: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  quantidade: number;
  descricao: string;
  categories: Category[];
  marca?: string;
  garantia?: string;
  modelo?: string;
  cor?: string;
  peso?: string;
  dimensoes?: string;
}

interface Category {
  id: number;
  name: string;
}


type Tab = 'descricao' | 'especificacoes' | 'avaliacoes';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('descricao');
  const [modalOpen, setModalOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:8080/api/produtos/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Erro ao buscar produto:', error));
  }, [id]);

  if (!product) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  const inStock = product.quantidade > 0;
  const hasDiscount = product.desconto > 0;
  const installmentValue = (product.preco / 12).toFixed(2).replace('.', ',');

  const handleAddToCart = () => {
    if (product && inStock) {
      addToCart(product);
    }
  };

  return (
    <div className="product-detail-container">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <button className="back-button" onClick={() => navigate('/')}>
        ← Voltar
      </button>

      <div className="breadcrumb">
        <span onClick={() => navigate('/')} className="breadcrumb-link">Início</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-link">
          {product.categories && product.categories.length > 0
            ? product.categories[0].name
            : 'Produtos'}
        </span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-main-content">
        <div className="product-images-column">
          <div className="product-image-main">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </div>


        <div className="product-info-column">
          {hasDiscount && (
            <div className="discount-badge-top">
              🔥 {product.desconto}% OFF
            </div>
          )}

          <h1 className="product-name">{product.name}</h1>

          <div className="product-rating">
            <div className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="rating-number">{product.rating}</span>
            <span className="reviews-text">({product.reviews} avaliações)</span>
          </div>

          <div className="quick-specs">
            <div className="quick-spec-item">
              <img src={categoriaIcon} className="spec-icon" alt="Categoria" />
              <div className="spec-details">
                <span className="spec-label">Categoria</span>
                <span className="spec-value">
                  {product.categories && product.categories.length > 0
                    ? product.categories[0].name
                    : 'Geral'}
                </span>
              </div>
            </div>

            {product.marca && (
              <div className="quick-spec-item">
                <img src={tagIcon} className="spec-icon" alt="Marca" />
                <div className="spec-details">
                  <span className="spec-label">Marca</span>
                  <span className="spec-value">{product.marca}</span>
                </div>
              </div>
            )}

            {product.garantia && (
              <div className="quick-spec-item">
                <img src={escudoIcon} className="spec-icon" alt="Garantia" />
                <div className="spec-details">
                  <span className="spec-label">Garantia</span>
                  <span className="spec-value">{product.garantia}</span>
                </div>
              </div>
            )}

            <div className="quick-spec-item">
              <img src={starIcon} className="spec-icon" alt="Avaliação" />
              <div className="spec-details">
                <span className="spec-label">Avaliação</span>
                <span className="spec-value">{product.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="product-description-preview">
            <h3>Sobre o produto</h3>
            <p>{product.descricao}</p>
          </div>
        </div>

 
        <div className="product-purchase-column">
          <div className="purchase-box">
            <div className="price-section">
              {hasDiscount && (
                <div className="price-original">
                  R$ {product.precoOriginal?.toFixed(2).replace('.', ',')}
                </div>
              )}
              <div className="price-current">
                R$ {product.preco.toFixed(2).replace('.', ',')}
              </div>
              <div className="price-installment">
                ou 12x de R$ {installmentValue} sem juros
              </div>
              {hasDiscount && (
                <div className="price-pix">
                  À vista no PIX com {product.desconto}% de desconto
                </div>
              )}
            </div>

            <div className={`stock-status ${inStock ? 'in-stock' : 'out-stock'}`}>
              <span className="stock-icon">{inStock ? '✓' : '✕'}</span>
              <span className="stock-text">
                {inStock
                  ? `Em estoque (${product.quantidade} unidades)`
                  : 'Produto esgotado'}
              </span>
            </div>

           <div className="purchase-actions">
            <button
              className="btn-buy-now"
              disabled={!inStock}
              onClick={() => setModalOpen(true)}
            >
              {inStock ? 'COMPRAR AGORA' : 'INDISPONÍVEL'}
            </button>
            <button
              className="btn-add-cart-secondary"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <img src={shoppingCart} className="cart-icon" alt="Carrinho" />
              Adicionar ao Carrinho
            </button>
          </div>

            <div className="purchase-info-items">
              <div className="info-item">
                <span className="info-text">Frete grátis acima de R$ 199</span>
              </div>
              <div className="info-item">
                <span className="info-text">Compra 100% segura</span>
              </div>
              <div className="info-item">
                <span className="info-text">Devolução grátis em 7 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-full-description">
        <div className="description-tabs">
          <button
            className={`tab-button ${activeTab === 'descricao' ? 'active' : ''}`}
            onClick={() => setActiveTab('descricao')}
          >
            Descrição
          </button>
          <button
            className={`tab-button ${activeTab === 'especificacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('especificacoes')}
          >
            Especificações
          </button>
          <button
            className={`tab-button ${activeTab === 'avaliacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('avaliacoes')}
          >
            Avaliações ({product.reviews})
          </button>
        </div>

        <div className="description-content">

  
          {activeTab === 'descricao' && (
            <>
              <h2>Descrição Completa</h2>
              <p>{product.descricao}</p>
            </>
          )}


          {activeTab === 'especificacoes' && (
            <>
              <h2>Especificações Técnicas</h2>
              <div className="specs-grid">
                <div className="spec-row">
                  <span className="spec-key">Categoria:</span>
                  <span className="spec-val">
                    {product.categories && product.categories.length > 0
                      ? product.categories[0].name
                      : 'Sem categoria'}
                  </span>
                </div>
                {product.marca && (
                  <div className="spec-row">
                    <span className="spec-key">Marca:</span>
                    <span className="spec-val">{product.marca}</span>
                  </div>
                )}
                {product.modelo && (
                  <div className="spec-row">
                    <span className="spec-key">Modelo:</span>
                    <span className="spec-val">{product.modelo}</span>
                  </div>
                )}
                {product.garantia && (
                  <div className="spec-row">
                    <span className="spec-key">Garantia:</span>
                    <span className="spec-val">{product.garantia}</span>
                  </div>
                )}
                {product.cor && (
                  <div className="spec-row">
                    <span className="spec-key">Cor:</span>
                    <span className="spec-val">{product.cor}</span>
                  </div>
                )}
                {product.peso && (
                  <div className="spec-row">
                    <span className="spec-key">Peso:</span>
                    <span className="spec-val">{product.peso}</span>
                  </div>
                )}
                {product.dimensoes && (
                  <div className="spec-row">
                    <span className="spec-key">Dimensões:</span>
                    <span className="spec-val">{product.dimensoes}</span>
                  </div>
                )}
                <div className="spec-row">
                  <span className="spec-key">Disponibilidade:</span>
                  <span className="spec-val">{inStock ? 'Em estoque' : 'Esgotado'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Avaliação:</span>
                  <span className="spec-val">⭐ {product.rating}/5 ({product.reviews} avaliações)</span>
                </div>
              </div>
            </>
          )}

      
          {activeTab === 'avaliacoes' && (
            <>
              <h2>Avaliações dos Clientes</h2>
              <div className="avaliacoes-summary">
                <div className="avaliacoes-score">
                  <span className="score-number">{product.rating}</span>
                  <div className="score-stars">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="score-total">{product.reviews} avaliações</span>
                </div>
                <p className="avaliacoes-placeholder">
                  As avaliações dos clientes aparecerão aqui em breve.
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;