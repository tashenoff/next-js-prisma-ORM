import React from 'react';

const CategoriesList = ({ categories, deleteCategory }) => {
  return (
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
  );
};

export default CategoriesList;
