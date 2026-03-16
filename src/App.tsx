import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Search from "./pages/Search";

const theme = {
  token: {
    colorPrimary: '#cf0a2c',
    borderRadius: 6,
    fontFamily: 'HuaweiSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
