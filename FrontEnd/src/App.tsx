import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductDetail from './pages/Home/ProductDetail';
import Login from './pages/Login/Login'; 
import CategoryPage from './pages/Home/category';
import { CartProvider } from './pages/Home/CartContext';
import Cart from './pages/Home/Cart';
import SearchResults from './pages/Home/SearchResults';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/busca" element={<SearchResults />} />
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/categoria/:categoria" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;