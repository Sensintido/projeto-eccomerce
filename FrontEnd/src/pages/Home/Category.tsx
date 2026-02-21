import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import './CategoryPage.css';

const API_URL = import.meta.env.VITE_API_URL;


interface Category {
  id: number;
  name: string;
}


interface Product {
  id: number;
  name: string;
  preco: number;
  precoOriginal: number;
  desconto: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  quantidade: number;
  categories: Category[];
}

function CategoryPage() {
  const { categoria } = useParams<{ categoria: string }>();
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoria) return;

    setLoading(true);

    const categoriaUrl = encodeURIComponent(categoria);

    fetch(`${API_URL}/api/produtos/categoria/${categoriaUrl}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return res.json();
      })
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        setProdutos([]);
        setLoading(false);
      });
  }, [categoria]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="category-page">
        <h1 className="category-title">{categoria}</h1>

        <p className="category-subtitle">
          {produtos.length}{' '}
          {produtos.length === 1
            ? 'produto encontrado'
            : 'produtos encontrados'}
        </p>

        <div className="products-grid">
          {produtos.length > 0 ? (
            produtos.map(produto => (
              <ProductCard key={produto.id} produto={produto} />
            ))
          ) : (
            <p className="no-products">
              Nenhum produto encontrado na categoria "{categoria}".
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
