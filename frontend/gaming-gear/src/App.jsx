import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "../src/components/nav";
import Inicio from './pages/inicio';
import Footer from './components/footer';
import Categories from "./pages/categories";
import UserProfile from "./pages/userProfile";
import Cart from "./pages/cart";
import ProductDetail from "./pages/productDetail";
import AboutUs from "./pages/aboutUs";
import TerminosCondiciones from "./pages/terminosCondiciones";
import ResenasProducto from "./pages/resenasProductos";
import PantallaCheckout from "./pages/PantallaCheckout";
import CarritoCompras from "./pages/carritoCompras";
import Noticias from "./pages/noticias";
import Favorites from "./pages/favoritos";
import Categoria from "./pages/categoria";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NoticiaDetalle from "./pages/noticiaDetalle";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <div className="flex flex-col min-h-screen w-screen max-w-full overflow-x-hidden bg-red-900">
        <Nav />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/news" element={<Noticias />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/privacidad" element={<Login />} />
            <Route path="/terminos" element={<TerminosCondiciones />} />
            <Route path="/ofertas" element={<ResenasProducto />} />
            <Route path="/garantias" element={<PantallaCheckout />} />
            <Route path="/delivery" element={<CarritoCompras />} />
            <Route path="/categoria" element={<Categoria/>}/>
            <Route path="/news-detail" element={<NoticiaDetalle/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;