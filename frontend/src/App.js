import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import Shop from "./pages/Shop";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import { ProductsDataProvider } from "./data/ProductsData"; // Importa el Provider
import BestSeller from "./components/products"; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <ProductsDataProvider> {/* Envolvemos la parte que necesita los datos */}
          <Header />
          <main className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/bestsellers" element={<BestSeller />} /> {/* Ejemplo de dónde usar un componente que usa los datos */}
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </ProductsDataProvider>
      </Router>
      {/* for suggestion we need to hit ctrl + space */}
    </div>
  );
};

export default App;