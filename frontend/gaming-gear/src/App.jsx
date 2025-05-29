import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// componentes de interfaz
import Nav from "../src/components/nav";
import Footer from './components/footer';
import NavAdmin from "../src/components/navAdmin";

// paginas de la tienda
import Inicio from './pages/inicio';
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

// paginas de empleado
import AdminDashboard from "./pages/admin/adminDashboard";
import ClientSupport from "./pages/admin/clientSupport";
import FirstUse from "./pages/admin/firstUse";
import InitialConfig from "./pages/admin/initialConfig";
import Notifications from "./pages/admin/notifications";
import OrderManage from "./pages/admin/orderManage";
import PaswordRecovery from "./pages/admin/passwordRecovery";
import ProductManage from "./pages/admin/productManage";
import ShopConfig from "./pages/admin/shopConfig";
import UserMange from "./pages/admin/userManage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-screen max-w-full overflow-x-hidden bg-red-900">
          
          {/* Rutas públicas (Login y Signup) */}
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>

          {/* Navegación condicional */}
          <Nav />
          <NavAdmin />
          
          <main className="flex-grow w-full">
            <Routes>
              {/* Rutas públicas y de cliente */}
              <Route path="/" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <Inicio />
                </ProtectedRoute>
              } />
              
              <Route path="/categories" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <Categories />
                </ProtectedRoute>
              } />
              
              <Route path="/products" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <ProductDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/about-us" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <AboutUs />
                </ProtectedRoute>
              } />
              
              <Route path="/news" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <Noticias />
                </ProtectedRoute>
              } />
              
              <Route path="/categoria" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <Categoria/>
                </ProtectedRoute>
              }/>
              
              <Route path="/news-detail" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <NoticiaDetalle/>
                </ProtectedRoute>
              }/>

              {/* Rutas que requieren autenticación de cliente */}
              <Route path="/account" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <UserProfile />
                </ProtectedRoute>
              } />
              
              <Route path="/cart" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Cart />
                </ProtectedRoute>
              } />
              
              <Route path="/favorites" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Favorites />
                </ProtectedRoute>
              } />
              
              <Route path="/privacidad" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <Login />
                </ProtectedRoute>
              } />
              
              <Route path="/terminos" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <TerminosCondiciones />
                </ProtectedRoute>
              } />
              
              <Route path="/ofertas" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ResenasProducto />
                </ProtectedRoute>
              } />
              
              <Route path="/garantias" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <PantallaCheckout />
                </ProtectedRoute>
              } />
              
              <Route path="/delivery" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <CarritoCompras />
                </ProtectedRoute>
              } />

              {/* Rutas de empleado - Solo accesibles por empleados */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/client-support" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <ClientSupport />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/first-use" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <FirstUse />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/initial-config" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <InitialConfig />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/notifications" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <Notifications />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/order-manage" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <OrderManage />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/password-recovery" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <PaswordRecovery />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/product-manage" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <ProductManage />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/shop-config" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <ShopConfig />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/user-manage" element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <UserMange />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;