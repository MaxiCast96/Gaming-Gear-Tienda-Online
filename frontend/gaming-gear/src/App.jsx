import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// componentes de interfaz
import Nav from "./components/Nav";
import Footer from './components/Footer';
import NavAdmin from "./components/NavAdmin";

// paginas de la tienda
import Inicio from './pages/Inicio';
import Categories from "./pages/Categories";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/productDetail";
import AboutUs from "./pages/AboutUs";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import ResenasProducto from "./pages/ResenasProductos";
import PantallaCheckout from "./pages/PantallaCheckout";
import CarritoCompras from "./pages/CarritoCompras";
import Noticias from "./pages/Noticias";
import Favorites from "./pages/Favoritos";
import Categoria from "./pages/Categoria";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoticiaDetalle from "./pages/NoticiaDetalle";
import OrderHistory from "./pages/OrderHidtory";

// paginas de empleado
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientSupport from "./pages/admin/ClientSupport";
import FirstUse from "./pages/admin/FirstUse";
import InitialConfig from "./pages/admin/InitialConfig";
import Notifications from "./pages/admin/Notifications";
import OrderManage from "./pages/admin/OrderManage";
import PaswordRecovery from "./pages/admin/PasswordRecovery";
import ProductManage from "./pages/admin/ProductManage";
import ShopConfig from "./pages/admin/ShopConfig";
import UserMange from "./pages/admin/UserManage";

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
              
              <Route path="/products/:id" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <ProductDetail />
                </ProtectedRoute>
              } />

               <Route path="/product/:id/reviews" element={
                <ProtectedRoute allowedRoles={['client']} requireAuth={false}>
                  <ResenasProducto />
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
                  <OrderHistory />
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