// import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './features/products/components/product-list';
import ProductDetails from './features/products/components/product-details';
import ProductsView from './features/products/components/products-view';
import AddProductForm from './features/products/components/add-product-form';
import Layout from './features/products/components/layout';
import CartComponent from './features/cart/components/cart';
import { BoardComponent } from './tic-tac-toe';
import { ProductForm } from './practice-form'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="/products/add" element={<AddProductForm />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/game" element={<BoardComponent />} />
        <Route path="/products/form" element={<ProductForm />} />
      </Route>

      <Route path="/infiniteview" element={<ProductsView />} />
    </Routes>
  );
}

export default App;
