import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { slugify } from 'transliteration'; // Импорт функции для транслитерации

export default function Admin() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    price: '',
    sku: '',
    image: '',
    description: '',
    inStock: false,
    categoryId: '',
  });
  const [editProductId, setEditProductId] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
  });
  const [activeTab, setActiveTab] = useState('products');
  const [operationStatus, setOperationStatus] = useState(null); // Состояние для отслеживания статуса операции

  useEffect(() => {
    if (session) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => setProducts(data));

      fetch('/api/categories')
        .then(res => res.json())
        .then(data => setCategories(data));
    }
  }, [session]);

  if (!session) {
    return (
      <>
        <h1>Admin Panel</h1>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      </>
    );
  }

  const generateSlug = (name) => {
    const transliterated = slugify(name, { lowercase: true, separator: '-' });
    return transliterated;
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      const slug = generateSlug(value);
      setNewProduct({
        ...newProduct,
        [name]: value,
        slug: slug,
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: name === 'price' ? parseFloat(value) : value
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      categoryId: parseInt(newProduct.categoryId),
    };

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      const newProd = await res.json();
      setProducts([...products, newProd]);
      setNewProduct({
        name: '',
        slug: '',
        price: '',
        sku: '',
        image: '',
        description: '',
        inStock: false,
        categoryId: '',
      });
      setOperationStatus('success'); // Устанавливаем статус успешной операции
    } else {
      setOperationStatus('error'); // Устанавливаем статус ошибки, если что-то пошло не так
    }
  };

  const editProduct = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setEditProductId(id);
    setNewProduct({
      name: productToEdit.name,
      slug: productToEdit.slug,
      price: productToEdit.price,
      sku: productToEdit.sku,
      image: productToEdit.image,
      description: productToEdit.description,
      inStock: productToEdit.inStock,
      categoryId: productToEdit.categoryId,
    });
    setActiveTab('addProduct');
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      categoryId: parseInt(newProduct.categoryId),
    };

    const res = await fetch(`/api/products/${editProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      const updatedProd = await res.json();
      setProducts(products.map(product => (product.id === updatedProd.id ? updatedProd : product)));
      setEditProductId(null);
      setNewProduct({
        name: '',
        slug: '',
        price: '',
        sku: '',
        image: '',
        description: '',
        inStock: false,
        categoryId: '',
      });
      setActiveTab('products');
      setOperationStatus('success'); // Устанавливаем статус успешной операции
    } else {
      setOperationStatus('error'); // Устанавливаем статус ошибки, если что-то пошло не так
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setProducts(products.filter(product => product.id !== id));
      setOperationStatus('success'); // Устанавливаем статус успешной операции
    } else {
      setOperationStatus('error'); // Устанавливаем статус ошибки, если что-то пошло не так
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
    if (res.ok) {
      const newCat = await res.json();
      setCategories([...categories, newCat]);
      setNewCategory({ name: '' });
      setOperationStatus('success'); // Устанавливаем статус успешной операции
    } else {
      setOperationStatus('error'); // Устанавливаем статус ошибки, если что-то пошло не так
    }
  };

  const deleteCategory = async (id) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setCategories(categories.filter(category => category.id !== id));
      setOperationStatus('success'); // Устанавливаем статус успешной операции
    } else {
      setOperationStatus('error'); // Устанавливаем статус ошибки, если что-то пошло не так
    }
  };

  return (
    <SessionProvider session={session}>
      <>
        <h1>Admin Panel</h1>
        <button onClick={() => signOut()}>Sign out</button>

        {operationStatus === 'success' && (
          <p className="success-message">Operation successful!</p>
        )}
        {operationStatus === 'error' && (
          <p className="error-message">Operation failed. Please try again.</p>
        )}

        <div>
          <ul className="tabs">
            <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
            <li className={activeTab === 'addProduct' ? 'active' : ''} onClick={() => setActiveTab('addProduct')}>Add Product</li>
            <li className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Categories</li>
            <li className={activeTab === 'addCategory' ? 'active' : ''} onClick={() => setActiveTab('addCategory')}>Add Category</li>
          </ul>
          <div className="tab-content">
            {activeTab === 'products' && (
              <>
                <h2>Products</h2>
                <ul>
                  {products.map(product => (
                    <li key={product.id}>
                      <span onClick={() => editProduct(product.id)}>{product.name}</span>
                      <button onClick={() => deleteProduct(product.id)}>Delete</button>
                      <button onClick={() => editProduct(product.id)}>Edit</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {activeTab === 'addProduct' && (
              <>
                <h2>{editProductId ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={editProductId ? updateProduct : addProduct}>
                  <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleProductChange} />
                  <input type="text" name="slug" placeholder="Slug" value={newProduct.slug} onChange={handleProductChange} disabled />
                  <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleProductChange} />
                  <input type="text" name="sku" placeholder="SKU" value={newProduct.sku} onChange={handleProductChange} />
                  <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleProductChange} />
                  <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleProductChange} />
                  <label>
                    In Stock:
                    <input type="checkbox" name="inStock" checked={newProduct.inStock} onChange={() => setNewProduct(prev => ({ ...prev, inStock: !prev.inStock }))} />
                  </label>
                  <select name="categoryId" value={newProduct.categoryId} onChange={handleProductChange}>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <button type="submit">{editProductId ? 'Update Product' : 'Add Product'}</button>
                </form>
              </>
            )}
            {activeTab === 'categories' && (
              <>
                <h2>Categories</h2>
                <ul>
                  {categories.map(category => (
                    <li key={category.id}>
                      {category.name}
                      <button onClick={() => deleteCategory(category.id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {activeTab === 'addCategory' && (
              <>
                <h2>Add Category</h2>
                <form onSubmit={addCategory}>
                  <input type="text" name="name" placeholder="Category Name" value={newCategory.name} onChange={handleCategoryChange} />
                  <button type="submit">Add Category</button>
                </form>
              </>
            )}
          </div>
        </div>
      </>
    </SessionProvider>
  );
}
