// AdminPanel.js
import React, { useState, useEffect } from 'react';
import ProductList from './ProductsList';
import AddProductForm from './AddEditProductForm';
import CategoryList from './CategoriesList';
import AddCategoryForm from './AddCategoryForm';
import OperationMessage from './OperationMessage';
import { useSession, signOut } from 'next-auth/react';

export default function AdminPanel() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [operationStatus, setOperationStatus] = useState(null);

  useEffect(() => {
    if (session) {
      fetchProducts();
      fetchCategories();
    }
  }, [session]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    if (res.ok) {
      const data = await res.json();
      setCategories(data);
    }
  };

  const handleOperationStatus = (status) => {
    setOperationStatus(status);
    setTimeout(() => {
      setOperationStatus(null);
    }, 3000);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {session && (
        <>
          <button onClick={handleSignOut}>Sign out</button>
          <ul className="tabs">
            <li>
              <button onClick={() => setOperationStatus(null)}>Products</button>
            </li>
            <li>
              <button onClick={() => setOperationStatus(null)}>Add Product</button>
            </li>
            <li>
              <button onClick={() => setOperationStatus(null)}>Categories</button>
            </li>
            <li>
              <button onClick={() => setOperationStatus(null)}>Add Category</button>
            </li>
          </ul>
          <div className="tab-content">
            {operationStatus && <OperationMessage status={operationStatus} />}
            <ProductList products={products} setOperationStatus={handleOperationStatus} />
            <AddProductForm categories={categories} setOperationStatus={handleOperationStatus} fetchProducts={fetchProducts} />
            <CategoryList categories={categories} setOperationStatus={handleOperationStatus} />
            <AddCategoryForm setOperationStatus={handleOperationStatus} fetchCategories={fetchCategories} />
          </div>
        </>
      )}
    </div>
  );
}
