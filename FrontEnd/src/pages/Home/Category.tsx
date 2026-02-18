import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import './CategoryPage.css';

// 1. Atualize a interface Category para bater com o Back-end
interface Category {
  id: number;
  name: string;
}

// 2. Atualize a interface Product para incluir a lista de categorias
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
  categories: Category[]; // Mudou de category para categories (array)
}

function CategoryPage() {
  const { categoria } = useParams<{ categoria: string }>();
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoria) return;

    setLoading(true);
    
   
    const categoriaUrl = encodeURIComponent(categoria);

    fetch(`http://localhost:8080/api/produtos/categoria/${categoriaUrl}`)
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
        <h1 className="category-title">
          {categoria}
        </h1>
        <p className="category-subtitle">
          {produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
        
        <div className="products-grid">
          {produtos.length > 0 ? (
            produtos.map(produto => (
              <ProductCard key={produto.id} produto={produto} />
            ))
          ) : (
            <p className="no-products">Nenhum produto encontrado na categoria "{categoria}".</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;