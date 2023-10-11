import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCategory.css'

interface CategoryModel {
  _id: string;
  name: string;
}

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<CategoryModel>(
        'http://localhost:3000/categories/create',
        { name: newCategory }
      );
      setCategories([...categories, response.data]);
      setNewCategory('');

      console.log('Successful response:', response.status);
    } catch (error) {
      console.error('Error creating category', error);
    }
  };

  return (
    <div className="manage-categories-container">
      <h3 className="manage-categories-title">Adding a new category</h3>
      <form className="manage-categories-form">
        <div className="form-group">
          <label htmlFor="name">Name of category</label>
          <input
            type="text"
            id="name"
            placeholder="Name of category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        <button onClick={createCategory}>Add category</button>
      </form>

      <h3>Existing categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
