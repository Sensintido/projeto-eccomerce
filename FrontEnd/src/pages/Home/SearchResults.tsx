import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import './SearchResults.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<any[]>([]);
  const [filtrados, setFiltrados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get(`${API_URL}/api/produtos`)
      .then(res => {
        setProdutos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar produtos:', err);
        setLoading(false);
      });

  }, []);

  useEffect(() => {
    if (!query) return;

    const resultado = produtos.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(query.toLowerCase()) ||
      p.marca?.toLowerCase().includes(query.toLowerCase()) ||
      p.categories?.some((c: any) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFiltrados(resultado);
  }, [query, produtos]);

  return (
    <>
      <Navbar />

      <div className="search-results-container">
        <div className="search-results-header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Voltar
          </button>

          <div className="search-info">
            <h1>
              Resultados para: <span>"{query}"</span>
            </h1>
            <p>
              {filtrados.length} produto
              {filtrados.length !== 1 ? 's' : ''} encontrado
              {filtrados.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="search-loading">
            <div className="spinner"></div>
          </div>
        ) : filtrados.length === 0 ? (
          <div className="search-empty">
            <span className="search-empty-icon">🔍</span>
            <h2>Nenhum produto encontrado</h2>
            <p>Tente buscar por outro termo ou navegue pelas categorias.</p>
            <button onClick={() => navigate('/')}>
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtrados.map(item => (
              <ProductCard key={item.id} produto={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
