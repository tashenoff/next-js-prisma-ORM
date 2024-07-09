import React from 'react';

const CategoryForm = ({ newCategory, handleCategoryChange, addCategory }) => {
  return (
    <>
      <h2>Add Category</h2>
      <form onSubmit={addCategory}>
        <input type="text" name="name" placeholder="Category Name" value={newCategory.name} onChange={handleCategoryChange} />
        <button type="submit">Add Category</button>
      </form>
    </>
  );
};

export default CategoryForm;
