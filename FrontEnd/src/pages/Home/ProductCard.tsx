// ProductCard.tsx
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./ProductCard.css";

const ProductCard = ({ produto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produto/${produto.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="badge-discount">-{produto.desconto}%</div>
      
      <div className="product-image-container">
        <img src={produto.imageUrl} alt={produto.name} />
      </div>
      
      <div className="product-info">
        <div className="rating">
          <FaStar color="#ff3131" />
          <span>{produto.rating} ({produto.reviews})</span>
        </div>
        <h3>{produto.name}</h3>
        <p className="old-price">R$ {produto.precoOriginal?.toLocaleString('pt-BR')}</p>
        <p className="new-price">R$ {produto.preco?.toLocaleString('pt-BR')}</p>
        <p className="installments">ou 12x de R$ {(produto.preco / 12).toFixed(2)}</p>
        <span className="stock-status">● Em estoque</span>
      </div>
    </div>
  );
};

export default ProductCard;