import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Component
import { Header, Footer } from "./components";
// Pages
import { Home, Contact, Login, Reset, Register, Admin, Cart } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminOnlyRoute } from "./components/AdminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";

// Toastcontainer

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/register' element={<Register />} />
          {/* Admin */}
          <Route
            path='/admin/*'
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          {/* Product Detail */}
          <Route path='/product-details/:id' element={<ProductDetails />} />
          {/* Cart */}
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
