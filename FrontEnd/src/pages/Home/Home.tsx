import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from "../Home/Navbar";
import ProductCard from "../Home/ProductCard";
import './Home.css';
import rtxImage from '../../assets/rtx.webp';

// ✅ URL da API dinâmica
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/produtos`)
      .then(response => setProdutos(response.data))
      .catch(error => console.error("Erro ao buscar produtos:", error));
  }, []);

  const scrollToOfertas = () => {
    document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <section className="hero">
          <div className="hero-content">
            <span className="badge">⚡ Black Friday Antecipada</span>
            <h1>Os Melhores <span>Produtos Tech</span> Estão Aqui</h1>
            <p>
              Descubra as melhores ofertas em hardware, periféricos, games e muito mais.
              Entrega rápida e garantia estendida.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={scrollToOfertas}>
                Ver Ofertas
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate('/categoria/Hardware')}
              >
                Hardware
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src={rtxImage} alt="Placa de Vídeo" />
            <div className="price-tag">
              <p>A partir de</p>
              <strong>R$ 6767</strong>
            </div>
          </div>
        </section>

        <section className="info-bar">
          <div className="info-item">
            <div>
              <h3>Frete Grátis</h3>
              <p>Acima de R$ 299</p>
            </div>
          </div>
          <div className="info-item">
            <div>
              <h3>Garantia</h3>
              <p>Até 2 anos</p>
            </div>
          </div>
          <div className="info-item">
            <div>
              <h3>Entrega Rápida</h3>
              <p>Em até 24h</p>
            </div>
          </div>
        </section>

        <section className="offers-section" id="ofertas">
          <div className="offers-header">
            <h2>Ofertas Imperdíveis</h2>
          </div>

          <div className="products-grid">
            {produtos.map((item: any) => (
              <ProductCard key={item.id} produto={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
