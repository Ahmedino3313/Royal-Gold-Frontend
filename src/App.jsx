import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Hero from './components/Hero'
import FeaturesStrip from './components/FeaturesStrip'
import FeaturedProducts from './components/FeaturedProducts'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import AdminRoute from './components/AdminRoute'
import Dashboard from './pages/admin/Dashboard'

function Layout() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <FeaturesStrip />
            <FeaturedProducts />
            <Testimonials />
            <Newsletter />
            <Footer />
          </>
        } />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}

export default App