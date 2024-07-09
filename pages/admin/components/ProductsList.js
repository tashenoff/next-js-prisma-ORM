import React from 'react';

const ProductsList = ({ products, deleteProduct, editProduct }) => {
  return (
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
  );
};

export default ProductsList;
