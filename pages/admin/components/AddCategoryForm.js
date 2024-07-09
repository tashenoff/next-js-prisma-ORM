import React from 'react';

const AddCategoryForm = ({ newCategory, handleCategoryChange, addCategory }) => {
  return (
    <form onSubmit={addCategory}>
      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={newCategory.name}
        onChange={handleCategoryChange}
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
