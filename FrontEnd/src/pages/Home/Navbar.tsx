import { useEffect, useState } from 'react';
import { IoSearch, IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import "./Navbar.css";
import logo from "../../assets/MagiTech.png";

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const [userName, setUserName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserName(user.name);
      } catch (e) {
        console.error("Erro ao converter usuário", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName(null);
    window.location.reload();
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      navigate(`/busca?q=${encodeURIComponent(query)}`);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className="header">
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src={logo} alt="MAGITECH" className="logo-img" />
            <span className="logo-text">
              MAGI<span>TECH</span>
            </span>
          </Link>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IoSearch className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }} />
          </div>

          <div className="nav-actions">
            {userName ? (
              <div className="user-logged">
                <span>Olá, <strong>{userName}</strong></span>
                <button onClick={handleLogout} className="btn-logout">Sair</button>
              </div>
            ) : (
              <Link to="/login" className="action-item-link">
                <IoPersonOutline />
                <span>Entrar</span>
              </Link>
            )}

            <Link to="/carrinho" className="cart-button-link">
              <div className="cart-icon-wrapper">
                <IoCartOutline />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </div>
            </Link>
          </div>
        </div>

        <div className="categories-bar">
          <Link to="/categoria/Hardware">Hardware</Link>
          <Link to="/categoria/Perifericos">Periféricos</Link>
          <Link to="/categoria/Computadores">Computadores</Link>
          <Link to="/categoria/Celulares">Celulares</Link>
          <Link to="/categoria/TV & Áudio">TV & Áudio</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;