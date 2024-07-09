import React from 'react';
import { slugify } from 'transliteration';

const AddEditProductForm = ({ newProduct, handleProductChange, categories, editProductId, onSubmit }) => {
  const generateSlug = (name) => {
    const transliterated = slugify(name, { lowercase: true, separator: '-' });
    return transliterated;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Вызываем переданную функцию onSubmit при отправке формы
  };

  return (
    <>
      <h2>{editProductId ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleProductChange} />
        <input type="text" name="slug" placeholder="Slug" value={newProduct.slug} onChange={handleProductChange} disabled />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleProductChange} />
        <input type="text" name="sku" placeholder="SKU" value={newProduct.sku} onChange={handleProductChange} />
        <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleProductChange} />
        <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleProductChange} />
        <label>
          In Stock:
          <input type="checkbox" name="inStock" checked={newProduct.inStock} onChange={() => handleProductChange({ target: { name: 'inStock', value: !newProduct.inStock } })} />
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
  );
};

export default AddEditProductForm;
